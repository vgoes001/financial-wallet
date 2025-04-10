import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TransferModule } from './modules/transfer/transfer.module';
import { FinancialEventModule } from './modules/financial-events/financial-event.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    UserModule,
    TransferModule,
    FinancialEventModule,
    EventModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
