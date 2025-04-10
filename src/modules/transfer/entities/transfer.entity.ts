import { randomUUID } from 'node:crypto';
import { TransferStatusEnum, TransferStatusVO } from './transfer-status.vo';
import { EntityValidationError } from '../../shared/errors/entity-validation.error';
import { FinancialEvent } from '../../financial-events/entities/financial-event.entity';
import { FinancialEventType } from '../../financial-events/entities/financial-event-type.vo';

export type TransferConstructorProps = {
  id?: string;
  senderId: string;
  receiverId: string;
  status: TransferStatusVO;
  amount: number;
  transferDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type TransferCreateProps = {
  senderId: string;
  receiverId: string;
  status?: TransferStatusVO;
  amount: number;
  transferDate?: Date;
};

export type TransferOutput = {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  status: TransferStatusEnum;
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
    this.status = status;
    this.amount = amount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;

    this.validate();
  }

  private validate() {
    if (this.amount <= 0) {
      throw new EntityValidationError('Amount must be greater than 0');
    }
  }

  static create(props: TransferCreateProps) {
    return new Transfer({
      ...props,
      status: props.status ?? TransferStatusVO.createInProgress(),
      transferDate: new Date(),
    });
  }

  public createFinancialEvents(): FinancialEvent[] {
    const financialEvents: FinancialEvent[] = [];

    const creditFinancialEvent = new FinancialEvent({
      userId: this.receiverId,
      amount: this.amount,
      type: FinancialEventType.createCredit(),
      tranferId: this.id,
    });

    const debitFinancialEvent = new FinancialEvent({
      userId: this.senderId,
      amount: this.amount,
      type: FinancialEventType.createDebit(),
      tranferId: this.id,
    });

    financialEvents.push(creditFinancialEvent, debitFinancialEvent);

    return financialEvents;
  }
}
