import { IUserRepository } from 'src/modules/user/repository/user-repository';
import { Transfer } from '../../entities/transfer.entity';
import { ITransferRepository } from '../../repository/transfer-repository';
import { CreateTransferInput } from './create-transfer.input';
import { NotFoundException } from '@nestjs/common';
import { TransferMapper } from '../../mapper/transfer.mapper';
import { TransferToSelfError } from '../../../shared/errors/transfer-to-self.error';
import { TransferStatusVO } from '../../entities/transfer-status.vo';
import { CalculateBalanceService } from '../../../financial-events/service/calculate-balance.service';
import { IFinancialEventRepository } from '../../../financial-events/repository/financial-event.repository';
import { InsufficientBalanceError } from '../../../shared/errors/insufficient-balance.error';

export class CreateTransferUseCase {
  constructor(
    private transferRepository: ITransferRepository,
    private userRepository: IUserRepository,
    private financialEventRepository: IFinancialEventRepository,
    private calculateBalanceService: CalculateBalanceService,
  ) {}

  async execute(input: CreateTransferInput) {
    const receiver = await this.userRepository.findByEmail(input.receiverKey);

    if (receiver?.id === input.senderId) {
      throw new TransferToSelfError();
    }

    const sender = await this.userRepository.findById(input.senderId);

    if (!sender || !receiver) {
      throw new NotFoundException('Sender or receiver not found');
    }

    const financialEvents = await this.financialEventRepository.findByUserId(
      input.senderId,
    );

    const balance =
      this.calculateBalanceService.calculateBalance(financialEvents);

    if (balance < input.amount) {
      throw new InsufficientBalanceError();
    }

    const transfer = Transfer.create({
      ...input,
      receiverId: receiver.id,
      status: TransferStatusVO.createCompleted(),
    });

    const financialEventsCreated = transfer.createFinancialEvents();

    const transferCreated = await this.transferRepository.create(transfer);

    await this.financialEventRepository.createMany(financialEventsCreated);

    return TransferMapper.toOutput(transferCreated);
  }
}
