import { IUserRepository } from 'src/modules/user/repository/user-repository';
import { Transfer } from '../entities/transfer.entity';
import { ITransferRepository } from '../repository/transfer-repository';
import { CreateTransferInput } from './create-transfer.input';
import { NotFoundException } from '@nestjs/common';
import { TransferMapper } from '../mapper/transfer.mapper';
import { TransferToSelfError } from '../../shared/errors/transfer-to-self.error';
import { TransferStatusVO } from '../entities/transfer-status.vo';

export class CreateTransferUseCase {
  constructor(
    private transferRepository: ITransferRepository,
    private userRepository: IUserRepository,
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

    const transfer = Transfer.create({
      ...input,
      receiverId: receiver.id,
      status: TransferStatusVO.createCompleted(),
    });

    const transferCreated = await this.transferRepository.create(transfer);

    return TransferMapper.toOutput(transferCreated);
  }
}
