import { FinancialEvent } from '../../entities/financial-event.entity';
import { IFinancialEventRepository } from '../financial-event.repository';

export class FinancialEventInMemory implements IFinancialEventRepository {
  private financialEvents: FinancialEvent[] = [];

  async findByUserId(userId: string): Promise<FinancialEvent[]> {
    return this.financialEvents.filter((event) => event.userId === userId);
  }

  async create(financialEvent: FinancialEvent): Promise<FinancialEvent> {
    this.financialEvents.push(financialEvent);
    return financialEvent;
  }

  async createMany(
    financialEvents: FinancialEvent[],
  ): Promise<FinancialEvent[]> {
    this.financialEvents.push(...financialEvents);
    return financialEvents;
  }
}
