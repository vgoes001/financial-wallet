import { FinancialEventType } from '../entities/financial-event-type.vo';
import { FinancialEvent } from '../entities/financial-event.entity';
import { FinancialEventModelAttributes } from '../repository/sequelize/financial-event.model';

export class FinancialEventMapper {
  static toOutput(financialEvent: FinancialEvent): FinancialEvent {
    return {
      id: financialEvent.id,
      userId: financialEvent.userId,
      amount: financialEvent.amount,
      tranferId: financialEvent.tranferId,
      type: financialEvent.type,
      createdAt: financialEvent?.createdAt,
      updatedAt: financialEvent?.updatedAt,
      deletedAt: financialEvent?.deletedAt,
    };
  }

  static fromModelToEntity(
    financialEventModel: FinancialEventModelAttributes,
  ): FinancialEvent {
    if (!financialEventModel) {
      return null;
    }
    return new FinancialEvent({
      amount: Number(financialEventModel.amount),
      createdAt: financialEventModel.createdAt,
      deletedAt: financialEventModel.deletedAt,
      id: financialEventModel.id,
      tranferId: financialEventModel.tranferId,
      type: FinancialEventType.createFromValue(financialEventModel.type),
      userId: financialEventModel.userId,
      updatedAt: financialEventModel.updatedAt,
    });
  }

  static toModel(
    financialEvent: FinancialEvent,
  ): FinancialEventModelAttributes {
    return {
      amount: financialEvent.amount,
      createdAt: financialEvent.createdAt,
      deletedAt: financialEvent.deletedAt,
      id: financialEvent.id,
      tranferId: financialEvent.tranferId,
      type: financialEvent.type.value,
      userId: financialEvent.userId,
      updatedAt: financialEvent.updatedAt,
    };
  }
}
