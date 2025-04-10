import { forwardRef, Module } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './repository/sequelize/user.model';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './controller/user.controller';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { IUserRepository } from './repository/user-repository';
import { IAuthService } from '../auth/auth.interface';
import { UserSequelizeRepository } from './repository/sequelize/user-sequelize.repository';
import { SignInUserUseCase } from './use-cases/sign-in/sign-in.use-case';
import { FinancialEventModule } from '../financial-events/financial-event.module';
import { IFinancialEventRepository } from '../financial-events/repository/financial-event.repository';
import { CurrentBalanceUseCase } from './use-cases/current-balance/current-balance.use-case';
import { CalculateBalanceService } from '../financial-events/service/calculate-balance.service';
import { TransferModule } from '../transfer/transfer.module';
import { IMessageBroker } from '../message-broker/message-broker.interface';
import { RabbitmqModule } from '../message-broker/rabbittmq.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    AuthModule,
    FinancialEventModule,
    RabbitmqModule,
    forwardRef(() => TransferModule),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserSequelizeRepository,
      useFactory: (userModel: typeof UserModel) =>
        new UserSequelizeRepository(userModel),
      inject: [getModelToken(UserModel)],
    },
    {
      provide: 'UserRepository',
      useExisting: UserSequelizeRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        authService: IAuthService,
        messageBroker: IMessageBroker,
      ) => new CreateUserUseCase(userRepository, authService, messageBroker),
      inject: ['UserRepository', 'AuthService', 'MessageBroker'],
    },
    {
      provide: SignInUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        authService: IAuthService,
      ) => new SignInUserUseCase(userRepository, authService),
      inject: ['UserRepository', 'AuthService'],
    },
    {
      provide: CurrentBalanceUseCase,
      useFactory: (
        financialEventRepository: IFinancialEventRepository,
        calculateBalance: CalculateBalanceService,
      ) =>
        new CurrentBalanceUseCase(financialEventRepository, calculateBalance),
      inject: ['FinancialEventRepository', CalculateBalanceService],
    },
  ],
  exports: [
    {
      provide: 'UserRepository',
      useExisting: UserSequelizeRepository,
    },
  ],
})
export class UserModule {}
