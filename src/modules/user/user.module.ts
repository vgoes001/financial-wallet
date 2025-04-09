import { Module } from '@nestjs/common';
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

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), AuthModule],
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
      ) => new CreateUserUseCase(userRepository, authService),
      inject: ['UserRepository', 'AuthService'],
    },
    {
      provide: SignInUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        authService: IAuthService,
      ) => new SignInUserUseCase(userRepository, authService),
      inject: ['UserRepository', 'AuthService'],
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
