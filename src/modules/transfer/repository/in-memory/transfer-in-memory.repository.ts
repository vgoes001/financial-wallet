import { Transfer } from '../../entities/transfer.entity';

export class TransferInMemoryRepository {
  private transfers: Transfer[] = [];

  async create(transfer: Transfer): Promise<Transfer> {
    this.transfers.push(transfer);
    return transfer;
  }

  async findById(id: string): Promise<Transfer | null> {
    const transfer = this.transfers.find((transfer) => transfer.id === id);
    return transfer || null;
  }
}
