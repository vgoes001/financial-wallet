import { forwardRef, Module } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { TransferModel } from './repository/sequelize/transfer.model';
import { TransferController } from './controller/transfer.controller';
import { TransferSequelizeRepository } from './repository/sequelize/transfer-sequelize.repository';
import { CreateTransferUseCase } from './use-cases/create-transfer/create-transfer.use-case';
import { ITransferRepository } from './repository/transfer-repository';
import { IUserRepository } from '../user/repository/user-repository';
import { UserModule } from '../user/user.module';
import { CalculateBalanceService } from '../financial-events/service/calculate-balance.service';
import { IFinancialEventRepository } from '../financial-events/repository/financial-event.repository';
import { FinancialEventModule } from '../financial-events/financial-event.module';
import { ReverseTransferUseCase } from './use-cases/reverse-transfer/reverse-transfer.use-case';
import { IUnitOfWork } from '../shared/unit-of-work/unit-of-work';
import { UnitOfWorkSequelize } from '../shared/unit-of-work/unit-of-work-sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([TransferModel]),
    forwardRef(() => UserModule),
    FinancialEventModule,
  ],
  controllers: [TransferController],
  providers: [
    {
      provide: TransferSequelizeRepository,
      useFactory: (
        transferModel: typeof TransferModel,
        uow: UnitOfWorkSequelize,
      ) => new TransferSequelizeRepository(transferModel, uow),
      inject: [getModelToken(TransferModel), 'UnitOfWork'],
    },
    {
      provide: 'TransferRepository',
      useExisting: TransferSequelizeRepository,
    },
    {
      provide: CalculateBalanceService,
      useClass: CalculateBalanceService,
    },
    {
      provide: CreateTransferUseCase,
      useFactory: (
        transferRepository: ITransferRepository,
        userRepository: IUserRepository,
        financialEventsRepository: IFinancialEventRepository,
        calculateBalanceService: CalculateBalanceService,
        unitOfWork: IUnitOfWork,
      ) =>
        new CreateTransferUseCase(
          transferRepository,
          userRepository,
          financialEventsRepository,
          calculateBalanceService,
          unitOfWork,
        ),
      inject: [
        'TransferRepository',
        'UserRepository',
        'FinancialEventRepository',
        CalculateBalanceService,
        'UnitOfWork',
      ],
    },
    {
      provide: ReverseTransferUseCase,
      useFactory: (
        transferRepository: ITransferRepository,
        financialEventRepository: IFinancialEventRepository,
        unitOfWork: IUnitOfWork,
      ) =>
        new ReverseTransferUseCase(
          transferRepository,
          financialEventRepository,
          unitOfWork,
        ),
      inject: ['TransferRepository', 'FinancialEventRepository', 'UnitOfWork'],
    },
  ],
  exports: [
    {
      provide: CalculateBalanceService,
      useClass: CalculateBalanceService,
    },
  ],
})
export class TransferModule {}
