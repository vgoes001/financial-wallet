import { FinancialEvent } from '../entities/financial-event.entity';
import { FinancialEventEnum } from '../entities/financial-event-type.vo';

export class CalculateBalanceService {
  calculateBalance(financialEvents: FinancialEvent[]) {
    const balance = financialEvents.reduce((acc, event) => {
      if (event.type.value === FinancialEventEnum.DEBIT) {
        return acc - event.amount;
      } else if (event.type.value === FinancialEventEnum.CREDIT) {
        return acc + event.amount;
      }
      return acc;
    }, 0);

    return balance;
  }
}
