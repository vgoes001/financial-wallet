import { CreateUserUseCase } from './create-user.use-case';
import { UserSequelizeRepository } from '../../repository/sequelize/user-sequelize.repository';
import { UserModel } from '../../repository/sequelize/user.model';
import { AuthServiceImpl } from '../../../auth/auth.service';
import { Sequelize } from 'sequelize-typescript';
import { BadRequestException } from '@nestjs/common';

describe('CreateUserUseCase Integration Test', () => {
  let dbConnection: Sequelize;
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserSequelizeRepository;
  let authService: AuthServiceImpl;


  beforeAll(async () => {
    dbConnection = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [UserModel],
    })
  });

  afterAll(async () => {
    await dbConnection.close();
  });

  beforeEach(async () => {
    await dbConnection.sync({
      force: true,
    });
    authService = new AuthServiceImpl();
    userRepository = new UserSequelizeRepository(UserModel);
    createUserUseCase = new CreateUserUseCase(userRepository, authService);
  });

  it('should create a user', async () => {
    const spyCreate = jest.spyOn(userRepository, 'create');
    const spyHashPassword = jest.spyOn(authService, 'hashPassword');
    const output = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    expect(spyCreate).toHaveBeenCalled();
    expect(spyHashPassword).toHaveBeenCalled();
    const userCreated = await userRepository.findById(output.id);
    expect(userCreated).toBeDefined();
    expect(userCreated.name).toBe('John Doe');
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
