import { NotFoundException } from '@nestjs/common';
import { Transfer } from '../../entities/transfer.entity';
import { ITransferRepository } from '../transfer-repository';

export class TransferInMemoryRepository implements ITransferRepository {
  private transfers: Transfer[] = [];

  async create(transfer: Transfer): Promise<Transfer> {
    this.transfers.push(transfer);
    return transfer;
  }

  async findById(id: string): Promise<Transfer | null> {
    const transfer = this.transfers.find((transfer) => transfer.id === id);

    if (!transfer) {
      throw new NotFoundException('Transfer not found');
    }

    return transfer;
  }

  async update(transfer: Transfer): Promise<Transfer> {
    const transferToUpdate = this.transfers.find(
      (existingTransfer) => existingTransfer.id === transfer.id,
    );
    if (!transferToUpdate) {
      throw new NotFoundException('Transfer not found');
    }

    transferToUpdate.status = transfer.status;
    return transferToUpdate;
  }
}
