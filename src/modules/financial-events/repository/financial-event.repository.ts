import { FinancialEvent } from '../entities/financial-event.entity';

export interface IFinancialEventRepository {
  findByUserId(userId: string): Promise<FinancialEvent[]>;
  create(financialEvent: FinancialEvent): Promise<FinancialEvent>;
  createMany(financialEvents: FinancialEvent[]): Promise<FinancialEvent[]>;
}
