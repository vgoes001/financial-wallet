import { NotFoundException } from '@nestjs/common';
import { Transfer } from '../../entities/transfer.entity';
import { TransferMapper } from '../../mapper/transfer.mapper';
import { ITransferRepository } from '../transfer-repository';
import { TransferModel } from './transfer.model';
import { UnitOfWorkSequelize } from 'src/modules/shared/unit-of-work/unit-of-work-sequelize';

export class TransferSequelizeRepository implements ITransferRepository {
  constructor(
    private readonly transferModel: typeof TransferModel,
    private uow: UnitOfWorkSequelize,
  ) {}

  async update(transfer: Transfer): Promise<Transfer> {
    const transferToUpdate = await this.transferModel.findByPk(transfer.id);
    if (!transferToUpdate) {
      throw new NotFoundException('Transfer not found');
    }

    transferToUpdate.status = transfer.status.value;

    await transferToUpdate.save({
      transaction: this.uow.getTransaction(),
    });
    return TransferMapper.fromModelToEntity(transferToUpdate);
  }

  async create(transfer: Transfer): Promise<Transfer> {
    const newTransfer = await this.transferModel.create(
      TransferMapper.fromEntityToModel(transfer),
      {
        transaction: this.uow.getTransaction(),
      },
    );
    return TransferMapper.fromModelToEntity(newTransfer);
  }

  async findById(id: string): Promise<Transfer> {
    const transfer = await this.transferModel.findByPk(id);
    if (!transfer) {
      throw new NotFoundException('Transfer not found');
    }
    return TransferMapper.fromModelToEntity(transfer);
  }
}
