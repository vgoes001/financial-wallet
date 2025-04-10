import { FinancialEvent } from '../../entities/financial-event.entity';
import { IFinancialEventRepository } from '../financial-event.repository';
import { FinancialEventModel } from '../../repository/sequelize/financial-event.model';
import { FinancialEventMapper } from '../../mapper/financial-event.mapper';

export class FinancialEventSequelizeRepository
  implements IFinancialEventRepository
{
  constructor(
    private readonly financialEventModel: typeof FinancialEventModel,
  ) {}

  async findByUserId(userId: string): Promise<FinancialEvent[]> {
    const financialEvents = await this.financialEventModel.findAll({
      where: { userId },
    });

    return financialEvents.map((financialEvent) => {
      return FinancialEventMapper.fromModelToEntity(financialEvent);
    });
  }

  async create(financialEvent: FinancialEvent): Promise<FinancialEvent> {
    const newFinancialEvent = await this.financialEventModel.create(
      FinancialEventMapper.toModel(financialEvent),
    );
    return FinancialEventMapper.fromModelToEntity(newFinancialEvent);
  }

  async createMany(
    financialEvents: FinancialEvent[],
  ): Promise<FinancialEvent[]> {
    const newFinancialEvents = await this.financialEventModel.bulkCreate(
      financialEvents.map((financialEvent) =>
        FinancialEventMapper.toModel(financialEvent),
      ),
    );
    return newFinancialEvents.map((financialEvent) => {
      return FinancialEventMapper.fromModelToEntity(financialEvent);
    });
  }
}
