import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IFinancialEventRepository } from '../repository/financial-event.repository';
import { CreateInitialCreditUseCase } from '../use-cases/create-initial-credit/create-initial-credit.use-case';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class FinancialEventHandler {
  @Inject(CreateInitialCreditUseCase)
  private createInitialCreditUseCase: CreateInitialCreditUseCase;

  @OnEvent('user.created')
  async handleUserCreatedEvent(payload: User) {
    await this.createInitialCreditUseCase.execute(payload.id);
  }
}
