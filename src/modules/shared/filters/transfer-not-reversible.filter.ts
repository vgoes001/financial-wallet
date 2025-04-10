import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { TransferToSelfError } from '../errors/transfer-to-self.error';
import { Response } from 'express';
import { TransferNotReversibleError } from '../errors/transfer-not-reversible.error';

@Catch(TransferNotReversibleError)
export class TransferNotReversible implements ExceptionFilter {
  catch(exception: TransferToSelfError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: exception.message,
      error: 'Unprocessable Entity',
    });
  }
}
