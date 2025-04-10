import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export function CreateTransferDocs(
  target: any,
  key: string | symbol,
  descriptor?: PropertyDescriptor,
) {
  applyDecorators(
    ApiOperation({
      summary: 'Cadastra uma transferência',
      description: 'Cadastra uma transferência no sistema.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          receiverKey: {
            type: 'string',
            example: 'email@email.com',
          },
          amount: {
            type: 'number',
            example: 50,
          },
        },
      },
    }),
    ApiBearerAuth(),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Transferência criada com sucesso',
      example: {
        id: 'e4022416-165c-4280-b9dd-6fa698147bf3',
        senderId: '536601d1-2c29-4c51-91b1-0256beef5ed1',
        receiverId: '04aeb823-c999-4f1d-8b80-acaee8a0c559',
        amount: 50.99,
        status: 'completed',
        transferDate: '2025-04-09T01:35:09.924Z',
        createdAt: '2025-04-09T01:35:09.924Z',
        updatedAt: '2025-04-09T01:35:09.924Z',
      },
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Erro de validação',
      example: {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Amount must be greater than 0',
        error: 'Unprocessable Entity',
      },
    }),
  )(target, key, descriptor);
}

export function ReverseTransferDocs(
  target: any,
  key: string | symbol,
  descriptor?: PropertyDescriptor,
) {
  applyDecorators(
    ApiOperation({
      summary: 'Reverte uma transferência',
      description: 'Reverte uma transferência no sistema.',
    }),
    ApiBearerAuth(),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
    }),
    ApiParam({
      name: 'id',
      description: 'ID da transferência a ser revertida',
      type: 'string',
      example: 'e4022416-165c-4280-b9dd-6fa698147bf3',
    }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Transferência criada com sucesso',
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Erro de validação',
      example: {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Amount must be greater than 0',
        error: 'Unprocessable Entity',
      },
    }),
  )(target, key, descriptor);
}
