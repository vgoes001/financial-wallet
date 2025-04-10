import { Global, Logger, Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getConnectionToken, SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../user/repository/sequelize/user.model';
import { TransferModel } from '../transfer/repository/sequelize/transfer.model';
import { FinancialEventModel } from '../financial-events/repository/sequelize/financial-event.model';
import { UnitOfWorkSequelize } from '../shared/unit-of-work/unit-of-work-sequelize';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          dialect: configService.get('DB_DIALECT'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          models: [UserModel, TransferModel, FinancialEventModel],
          logging: (msg) => {
            if (configService.get('DB_LOGGING') === 'true') {
              Logger.log(msg, 'Sequelize');
            }
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: UnitOfWorkSequelize,
      scope: Scope.REQUEST,
      useFactory: (sequelize) => {
        return new UnitOfWorkSequelize(sequelize);
      },
      inject: [getConnectionToken()],
    },
    {
      provide: 'UnitOfWork',
      useExisting: UnitOfWorkSequelize,
      scope: Scope.REQUEST,
    },
  ],
  exports: ['UnitOfWork'],
})
export class DatabaseModule {}
