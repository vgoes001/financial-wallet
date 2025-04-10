import { Module } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { FinancialEventModel } from './repository/sequelize/financial-event.model';
import { FinancialEventSequelizeRepository } from './repository/sequelize/financial-event-sequelize.repository';
import { FinancialEventHandler } from './handlers/financial-event.handler';
import { CreateInitialCreditUseCase } from './use-cases/create-initial-credit/create-initial-credit.use-case';
import { IUnitOfWork } from '../shared/unit-of-work/unit-of-work';
import { UnitOfWorkSequelize } from '../shared/unit-of-work/unit-of-work-sequelize';

@Module({
  imports: [SequelizeModule.forFeature([FinancialEventModel])],
  controllers: [],
  providers: [
    {
      provide: FinancialEventSequelizeRepository,
      useFactory: (
        financialEventModel: typeof FinancialEventModel,
        uow: UnitOfWorkSequelize,
      ) => new FinancialEventSequelizeRepository(financialEventModel, uow),
      inject: [getModelToken(FinancialEventModel), 'UnitOfWork'],
    },
    {
      provide: 'FinancialEventRepository',
      useExisting: FinancialEventSequelizeRepository,
    },
    {
      provide: CreateInitialCreditUseCase,
      useFactory: (
        financialEventRepository: FinancialEventSequelizeRepository,
      ) => new CreateInitialCreditUseCase(financialEventRepository),
      inject: ['FinancialEventRepository'],
    },
    FinancialEventHandler,
  ],
  exports: [
    {
      provide: 'FinancialEventRepository',
      useExisting: FinancialEventSequelizeRepository,
    },
  ],
})
export class FinancialEventModule {}
