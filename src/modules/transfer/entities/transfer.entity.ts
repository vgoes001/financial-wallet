import { randomUUID } from 'node:crypto';
import { TransferStatusVO } from './transfer-status.vo';

export type TransferConstructorProps = {
  id?: string;
  senderId: string;
  receiverId: string;
  status?: TransferStatusVO;
  amount: number;
  transferDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class Transfer {
  id: string;

  senderId: string;

  receiverId: string;

  amount: number;

  status: TransferStatusVO;

  transferDate: Date;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor({
    id,
    senderId,
    receiverId,
    amount,
    status,
    transferDate,
    createdAt,
    updatedAt,
    deletedAt,
  }: TransferConstructorProps) {
    this.id = id ?? randomUUID();
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.transferDate = transferDate;
    this.status = status ?? TransferStatusVO.createInProgress();
    this.amount = amount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
