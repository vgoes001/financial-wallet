import { UnprocessableEntityException } from '@nestjs/common';
import { IFinancialEventRepository } from '../../../../modules/financial-events/repository/financial-event.repository';
import { TransferNotReversibleError } from '../../../../modules/shared/errors/transfer-not-reversible.error';
import { ITransferRepository } from '../../repository/transfer-repository';
import { ReverseTransferInput } from './reverse-transfer.input';

export class ReverseTransferUseCase {
  constructor(
    private transferRepository: ITransferRepository,
    private financialEventRepository: IFinancialEventRepository,
  ) {}

  async execute(input: ReverseTransferInput) {
    const transfer = await this.transferRepository.findById(input.transferId);

    if (!transfer.isReversible()) {
      throw new TransferNotReversibleError();
    }

    if (transfer.senderId !== input.userId) {
      throw new UnprocessableEntityException();
    }

    transfer.refund();
    const financialEventsReversed = transfer.createReversedFinancialEvents();
    await this.financialEventRepository.createMany(financialEventsReversed);
    await this.transferRepository.update(transfer);
  }
}
