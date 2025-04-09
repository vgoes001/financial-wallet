import {
  TransferStatusEnum,
  TransferStatusVO,
} from '../entities/transfer-status.vo';
import { Transfer, TransferOutput } from '../entities/transfer.entity';
import { TransferModelAttributes } from '../repository/sequelize/transfer.model';

export class TransferMapper {
  static toOutput(transfer: Transfer): TransferOutput {
    return {
      id: transfer.id,
      senderId: transfer.senderId,
      receiverId: transfer.receiverId,
      amount: transfer.amount,
      status: transfer.status.value,
      transferDate: transfer.transferDate,
      createdAt: transfer?.createdAt,
      updatedAt: transfer?.updatedAt,
      deletedAt: transfer?.deletedAt,
    };
  }

  static fromEntityToModel(transfer: Transfer): TransferModelAttributes {
    return {
      id: transfer.id,
      senderId: transfer.senderId,
      receiverId: transfer.receiverId,
      status: transfer.status.value,
      amount: transfer.amount,
      transferDate: transfer.transferDate,
      createdAt: transfer.createdAt,
      updatedAt: transfer.updatedAt,
      deletedAt: transfer.deletedAt,
    };
  }

  static fromModelToEntity(transferModel: TransferModelAttributes): Transfer {
    if (!transferModel) {
      return null;
    }
    return new Transfer({
      id: transferModel.id,
      senderId: transferModel.senderId,
      receiverId: transferModel.receiverId,
      amount: transferModel.amount,
      status: TransferStatusVO.createFromValue(transferModel.status),
      transferDate: transferModel.transferDate,
      createdAt: transferModel.createdAt,
      updatedAt: transferModel.updatedAt,
      deletedAt: transferModel.deletedAt,
    });
  }
}
