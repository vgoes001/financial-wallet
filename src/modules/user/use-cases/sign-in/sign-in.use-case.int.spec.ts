
import { SignInUserUseCase } from './sign-in.use-case';
import { User } from '../../entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../../repository/sequelize/user.model';
import { UserSequelizeRepository } from '../../repository/sequelize/user-sequelize.repository';
import { IAuthService } from 'src/modules/auth/auth.interface';
import { AuthFake } from '../../../auth/auth.fake';


describe('SignInUserUseCase', () => {
  let dbConnection: Sequelize;
  let signInUserUseCase: SignInUserUseCase;
  let userRepository: UserSequelizeRepository;
  let authService: IAuthService;

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
    userRepository = new UserSequelizeRepository(UserModel);
    authService = new AuthFake();
    signInUserUseCase = new SignInUserUseCase(userRepository, authService);
  });

    it('should sign in a user', async () => {
      const user = User.create({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123456',
      });

      const hashed = await authService.hashPassword(user.password);
      user.changePassword(hashed);

      await userRepository.create(user);

      const spyGenerateToken = jest.spyOn(authService, 'generateToken');
      const spyComparePassword = jest.spyOn(authService, 'comparePassword');
      const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');

      const { token } = await signInUserUseCase.execute({
        email: user.email,
        password: '123456',
      });
      expect(token).toBeDefined();
      expect(spyGenerateToken).toHaveBeenCalled();
      expect(spyComparePassword).toHaveBeenCalled();
      expect(spyFindByEmail).toHaveBeenCalled();
    });

    it('should throw an error if user not found', async () => {
      try {
        await signInUserUseCase.execute({
          email: 'johndoe@example.com',
          password: '123456',
        });
        fail('should have thrown an error');
      } catch (error) {
        expect(error.message).toBe('User or password incorrect');
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if password does not match', async () => {
      const user = User.create({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123456',
      });

      const hashed = await authService.hashPassword(user.password);
      user.changePassword(hashed);

      await userRepository.create(user);

      const spyGenerateToken = jest.spyOn(authService, 'generateToken');
      const spyComparePassword = jest.spyOn(authService, 'comparePassword');
      const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');

      try {
        await signInUserUseCase.execute({
          email: user.email,
          password: 'wrong-password',
        });
        fail('should have thrown an error');
      } catch (error) {
        expect(spyFindByEmail).toHaveBeenCalled();
        expect(spyComparePassword).toHaveBeenCalled();
        expect(spyGenerateToken).not.toHaveBeenCalled();
        expect(error.message).toBe('User or password incorrect');
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
});
