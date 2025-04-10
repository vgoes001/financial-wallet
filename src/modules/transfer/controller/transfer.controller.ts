import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTransferUseCase } from '../use-cases/create-transfer/create-transfer.use-case';
import { CreateTransferDto } from './dtos/create-transfer.dto';
import { UserId } from 'src/modules/shared/decorators/user-id.decorator';
import { CreateTransferDocs, ReverseTransferDocs } from '../transfer.docs';
import { ReverseTransferUseCase } from '../use-cases/reverse-transfer/reverse-transfer.use-case';

@Controller('transfers')
export class TransferController {
  @Inject(CreateTransferUseCase)
  private createTransferUseCase: CreateTransferUseCase;

  @Inject(ReverseTransferUseCase)
  private reverseTransferUseCase: ReverseTransferUseCase;

  @CreateTransferDocs
  @Post()
  async createTransfer(
    @Body() createTransferDto: CreateTransferDto,
    @UserId() userId: string,
  ) {
    const { receiverKey, amount } = createTransferDto;

    return this.createTransferUseCase.execute({
      senderId: userId,
      receiverKey,
      amount,
    });
  }

  @ReverseTransferDocs
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':id/reverse')
  async reverseTransfer(
    @Param('id') transferId: string,
    @UserId() userId: string,
  ) {
    return this.reverseTransferUseCase.execute({
      transferId,
      userId,
    });
  }
}
