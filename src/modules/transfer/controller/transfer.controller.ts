import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateTransferUseCase } from '../use-cases/create-transfer.use-case';
import { CreateTransferDto } from './dtos/create-transfer.dto';
import { UserId } from 'src/modules/shared/decorators/user-id.decorator';

@Controller('transfers')
export class TransferController {
  @Inject(CreateTransferUseCase)
  private createTransferUseCase: CreateTransferUseCase;

  @Post()
  async createTransfer(
    @Body() createTransferDto: CreateTransferDto,
    @UserId() userId: string,
  ) {
    console.log('userId', userId);
    console.log('createTransferDto', createTransferDto);
    const { receiverKey, amount } = createTransferDto;

    return this.createTransferUseCase.execute({
      senderId: userId,
      receiverKey,
      amount,
    });
  }
}
