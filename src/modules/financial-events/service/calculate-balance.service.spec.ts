import { FinancialEvent } from '../entities/financial-event.entity';
import { FinancialEventType } from '../entities/financial-event-type.vo';
import { CalculateBalanceService } from './calculate-balance.service';

describe('CalculateBalanceService', () => {
  it('should calculate the balance correctly', () => {
    const service = new CalculateBalanceService();
    const financialEvents = [
      new FinancialEvent({
        type: FinancialEventType.createCredit(),
        amount: 100,
        tranferId: 'transfer-1',
        userId: 'user-1',
      }),
      new FinancialEvent({
        type: FinancialEventType.createDebit(),
        amount: 50,
        tranferId: 'transfer-2',
        userId: 'user-1',
      }),
      new FinancialEvent({
        type: FinancialEventType.createCredit(),
        amount: 200,
        tranferId: 'transfer-1',
        userId: 'user-1',
      }),
    ];

    const balance = service.calculateBalance(financialEvents);
    expect(balance).toBe(250);
  });
});
