import { Module } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { FinancialEventModel } from './repository/sequelize/financial-event.model';
import { FinancialEventSequelizeRepository } from './repository/sequelize/financial-event-sequelize.repository';

@Module({
  imports: [SequelizeModule.forFeature([FinancialEventModel])],
  controllers: [],
  providers: [
    {
      provide: FinancialEventSequelizeRepository,
      useFactory: (financialEventModel: typeof FinancialEventModel) =>
        new FinancialEventSequelizeRepository(financialEventModel),
      inject: [getModelToken(FinancialEventModel)],
    },
    {
      provide: 'FinancialEventRepository',
      useExisting: FinancialEventSequelizeRepository,
    },
  ],
  exports: [
    {
      provide: 'FinancialEventRepository',
      useExisting: FinancialEventSequelizeRepository,
    },
  ],
})
export class FinancialEventModule {}
