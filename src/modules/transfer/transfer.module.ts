import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    SequelizeModule.forFeature([TransferModel]),
    UserModule,
    FinancialEventModule,
  ],
  controllers: [TransferController],
  providers: [
    {
      provide: TransferSequelizeRepository,
      useFactory: (transferModel: typeof TransferModel) =>
        new TransferSequelizeRepository(transferModel),
      inject: [getModelToken(TransferModel)],
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
      ) =>
        new CreateTransferUseCase(
          transferRepository,
          userRepository,
          financialEventsRepository,
          calculateBalanceService,
        ),
      inject: [
        'TransferRepository',
        'UserRepository',
        'FinancialEventRepository',
        CalculateBalanceService,
      ],
    },
    {
      provide: ReverseTransferUseCase,
      useFactory: (
        transferRepository: ITransferRepository,
        financialEventRepository: IFinancialEventRepository,
      ) =>
        new ReverseTransferUseCase(
          transferRepository,
          financialEventRepository,
        ),
      inject: ['TransferRepository', 'FinancialEventRepository'],
    },
  ],
})
export class TransferModule {}
