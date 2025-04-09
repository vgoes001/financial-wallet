import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { EntityValidationError } from '../errors/entity-validation.error';
import { Response } from 'express';

@Catch(EntityValidationError)
export class EntityValidationFilter {
  catch(exception: EntityValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: exception.message,
      error: 'Unprocessable Entity',
    });
  }
}
