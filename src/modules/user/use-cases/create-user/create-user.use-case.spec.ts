import { CreateUserUseCase } from './create-user.use-case';
import { UserInMemoryRepository } from '../../repository/in-memory/user-in-memory.repository';
import { IAuthService } from '../../../auth/auth.interface';
import { fail } from 'assert';
import { UserMapper } from '../../mapper/user.mapper';
import { BadRequestException } from '@nestjs/common';
import { IUserRepository } from '../../repository/user-repository';
import { AuthFake } from '../../../auth/auth.fake';
import { IMessageBroker } from '../../../message-broker/message-broker.interface';
import { MessageBrokerFakeService } from '../../../message-broker/message-broker-fake.service';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: IUserRepository;
  let authService: IAuthService;
  let broker: IMessageBroker;

  describe('execute', () => {
    beforeEach(() => {
      userRepository = new UserInMemoryRepository();
      authService = new AuthFake();
      broker = new MessageBrokerFakeService();

      createUserUseCase = new CreateUserUseCase(
        userRepository,
        authService,
        broker,
      );
    });

    it('should create a new user', async () => {
      const spyCreate = jest.spyOn(userRepository, 'create');
      const spyHashPassword = jest.spyOn(authService, 'hashPassword');
      const output = await createUserUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      });
      expect(spyCreate).toHaveBeenCalled();
      expect(spyHashPassword).toHaveBeenCalled();
      expect(userRepository['users'].length).toBe(1);
      const user = userRepository['users'][0];
      expect(output).toStrictEqual(UserMapper.toOutput(user));
    });

    it('should throw an error if user already exists', async () => {
      await createUserUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      });

      try {
        await createUserUseCase.execute({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        });
        fail('should have thrown an error');
      } catch (error) {
        expect(error.message).toBe('User already exists');
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
