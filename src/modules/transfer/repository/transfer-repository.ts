import { Transfer } from '../entities/transfer.entity';

export interface ITransferRepository {
  create(transfer: Transfer): Promise<Transfer>;
  findById(id: string): Promise<Transfer>;
}
