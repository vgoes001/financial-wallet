import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function SignInDocs(
  target: any,
  key: string | symbol,
  descriptor?: PropertyDescriptor,
) {
  applyDecorators(
    ApiOperation({
      summary: 'Autentica um usuário',
      description: 'Retorna um token de autenticação para o usuário informado.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            example: 'john@email.com',
          },
          senha: {
            type: 'string',
            example: '123456',
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Token de autenticação',
      example: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNzMzMTQ3MTE3LCJleHAiOjE3MzMyMzM1MTd9.KoJDXN-sQ0ObnafAkPCdIVet8yIOoeo041Ukx04QpNs',
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Erro de validação',
      example: {
        message: 'User or password incorrect',
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      },
    }),
  )(target, key, descriptor);
}

export function CreateUserDocs(
  target: any,
  key: string | symbol,
  descriptor?: PropertyDescriptor,
) {
  applyDecorators(
    ApiOperation({
      summary: 'Cadastra um usuário',
      description: 'Cadastra um usuário no sistema. ',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            example: 'admin@admin.com',
          },
          password: {
            type: 'string',
            example: '123456',
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Usuário cadastrado com sucesso',
      example: {
        id: '536601d1-2c29-4c51-91b1-0256beef5ed1',
        name: 'john',
        email: 'john@email.com',
        password:
          '$2b$10$WSfqTHpU2Rgfz9BTffMJM.DfbtZ3OJN5sRcFEq.VZ9lZlokTB08Hi',
        createdAt: '2025-04-08T01:21:31.705Z',
        updatedAt: '2025-04-08T01:21:31.705Z',
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Erro de validação',
      example: {
        message: 'User already exists',
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      },
    }),
  )(target, key, descriptor);
}

export function CurrentBalanceDocs(
  target: any,
  key: string | symbol,
  descriptor?: PropertyDescriptor,
) {
  applyDecorators(
    ApiOperation({
      summary: 'Retorna o saldo atual do usuário',
      description: 'Retorna o saldo atual do usuário logado.',
    }),
    ApiBearerAuth(),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Saldo atual do usuário',
      example: {
        balance: 550,
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Erro de validação',
      example: {
        message: 'User already exists',
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      },
    }),
  )(target, key, descriptor);
}
