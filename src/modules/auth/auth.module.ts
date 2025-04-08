import { Module } from '@nestjs/common';
import { AuthFake } from './auth.fake';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthServiceImpl } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.get('JWT_SECRET');
        return {
          secret: jwtSecret,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: AuthFake,
      useClass: AuthFake,
    },
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
  ],
  exports: [
    {
      provide: AuthFake,
      useClass: AuthFake,
    },
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthModule {}
