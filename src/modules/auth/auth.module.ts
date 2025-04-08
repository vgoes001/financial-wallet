import { Module } from '@nestjs/common';
import { AuthFake } from './auth.fake';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthServiceImpl } from './auth.service';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { IAuthService } from './auth.interface';
import { AuthGuard } from './guards/auth.guard';

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
    {
      provide: APP_GUARD,
      useFactory: (
        reflector: Reflector,
        authService: IAuthService,
        configService: ConfigService,
      ) => {
        return new AuthGuard(reflector, authService, configService);
      },
      inject: [Reflector, 'AuthService', ConfigService],
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
