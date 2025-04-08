import { Module } from '@nestjs/common';
import { AuthFake } from './auth.fake';

@Module({
  providers: [
    {
      provide: AuthFake,
      useClass: AuthFake,
    },
  ],
  exports: [
    {
      provide: AuthFake,
      useClass: AuthFake,
    },
  ],
})
export class AuthModule {}
