import { Module } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { TransferModel } from './repository/sequelize/transfer.model';
import { TransferController } from './controller/transfer.controller';
import { TransferSequelizeRepository } from './repository/sequelize/transfer-sequelize.repository';
import { CreateTransferUseCase } from './use-cases/create-transfer.use-case';
import { ITransferRepository } from './repository/transfer-repository';
import { IUserRepository } from '../user/repository/user-repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([TransferModel]), UserModule],
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
      provide: CreateTransferUseCase,
      useFactory: (
        transferRepository: ITransferRepository,
        userRepository: IUserRepository,
      ) => new CreateTransferUseCase(transferRepository, userRepository),
      inject: ['TransferRepository', 'UserRepository'],
    },
  ],
})
export class TransferModule {}
