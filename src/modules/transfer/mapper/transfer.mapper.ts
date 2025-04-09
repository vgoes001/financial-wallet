import { TransferStatusEnum } from '../entities/transfer-status.vo';
import { Transfer, TransferOutput } from '../entities/transfer.entity';

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
}
