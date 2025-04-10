import { forwardRef, Module } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './repository/sequelize/user.model';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './controller/user.controller';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { IUserRepository } from './repository/user-repository';
import { IAuthService } from '../auth/auth.interface';
import { UserSequelizeRepository } from './repository/sequelize/user-sequelize.repository';
import { AuthFake } from '../auth/auth.fake';
import { SignInUserUseCase } from './use-cases/sign-in/sign-in.use-case';
import { AuthServiceImpl } from '../auth/auth.service';
import { FinancialEventModule } from '../financial-events/financial-event.module';
import { IFinancialEventRepository } from '../financial-events/repository/financial-event.repository';
import { CurrentBalanceUseCase } from './use-cases/current-balance/current-balance.use-case';
import { CalculateBalanceService } from '../financial-events/service/calculate-balance.service';
import { TransferModule } from '../transfer/transfer.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    AuthModule,
    FinancialEventModule,
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
        financialEventRepository: IFinancialEventRepository,
        authService: IAuthService,
      ) =>
        new CreateUserUseCase(
          userRepository,
          financialEventRepository,
          authService,
        ),
      inject: ['UserRepository', 'FinancialEventRepository', 'AuthService'],
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
