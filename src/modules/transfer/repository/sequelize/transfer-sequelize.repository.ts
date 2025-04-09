import { Transfer } from '../../entities/transfer.entity';
import { TransferMapper } from '../../mapper/transfer.mapper';
import { ITransferRepository } from '../transfer-repository';
import { TransferModel } from './transfer.model';

export class TransferSequelizeRepository implements ITransferRepository {
  constructor(private readonly transferModel: typeof TransferModel) {}

  async create(transfer: Transfer): Promise<Transfer> {
    const newTransfer = await this.transferModel.create(
      TransferMapper.fromEntityToModel(transfer),
    );
    return TransferMapper.fromModelToEntity(newTransfer);
  }

  async findById(id: string): Promise<Transfer> {
    const transfer = await this.transferModel.findByPk(id);
    if (!transfer) {
      return null;
    }
    return TransferMapper.fromModelToEntity(transfer);
  }
}
