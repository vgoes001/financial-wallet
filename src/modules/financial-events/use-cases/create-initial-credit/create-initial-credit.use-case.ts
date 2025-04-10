import { FinancialEvent } from '../../entities/financial-event.entity';
import { IFinancialEventRepository } from '../../repository/financial-event.repository';

export class CreateInitialCreditUseCase {
  constructor(private financialEventRepository: IFinancialEventRepository) {}

  async execute(userId: string): Promise<void> {
    const financialEvent = FinancialEvent.createInitialCredit(userId);
    await this.financialEventRepository.create(financialEvent);
  }
}
