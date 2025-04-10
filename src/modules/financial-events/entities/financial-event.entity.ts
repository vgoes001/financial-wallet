import { randomUUID } from 'crypto';
import { FinancialEventType } from './financial-event-type.vo';

const INITIAL_CREDIT = 500;

export type FinancialEventConstructorProps = {
  id?: string;
  userId: string;
  amount: number;
  tranferId?: string;
  type: FinancialEventType;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class FinancialEvent {
  id: string;

  userId: string;

  amount: number;

  tranferId?: string;

  type: FinancialEventType;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor({
    id,
    userId,
    amount,
    type,
    tranferId,
    createdAt,
    updatedAt,
    deletedAt,
  }: FinancialEventConstructorProps) {
    this.id = id ?? randomUUID();
    this.userId = userId;
    this.amount = amount;
    this.type = type;
    this.tranferId = tranferId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static createInitialCredit(userId: string): FinancialEvent {
    return new FinancialEvent({
      userId,
      amount: INITIAL_CREDIT,
      type: FinancialEventType.createCredit(),
    });
  }
}
