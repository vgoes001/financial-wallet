import { IFinancialEventRepository } from 'src/modules/financial-events/repository/financial-event.repository';
import { CurrentBalanceInput } from './current-balance.input';
import { CalculateBalanceService } from 'src/modules/financial-events/service/calculate-balance.service';

export class CurrentBalanceUseCase {
  constructor(
    private financialEventsRepository: IFinancialEventRepository,
    private calculateBalance: CalculateBalanceService,
  ) {}

  async execute({ userId }: CurrentBalanceInput): Promise<number> {
    const financialEvents =
      await this.financialEventsRepository.findByUserId(userId);

    return this.calculateBalance.calculateBalance(financialEvents);
  }
}
