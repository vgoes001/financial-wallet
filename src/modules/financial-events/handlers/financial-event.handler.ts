import { Inject, Injectable } from '@nestjs/common';
import { CreateInitialCreditUseCase } from '../use-cases/create-initial-credit/create-initial-credit.use-case';
import { User } from 'src/modules/user/entities/user.entity';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Public } from 'src/modules/auth/decorators/public.decorator';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class FinancialEventHandler {
  constructor(private moduleRef: ModuleRef) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'user.created',
    queue: 'user.created',
    allowNonJsonMessages: true,
  })
  async handleUserCreatedEvent(payload: User) {
    const createInitialCreditUseCase = await this.moduleRef.resolve(
      CreateInitialCreditUseCase,
    );
    await createInitialCreditUseCase.execute(payload.id);
  }
}
