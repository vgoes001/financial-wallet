import { User } from '../../entities/user.entity';
import { UserInMemoryRepository } from './user-in-memory.repository';

describe('UserInMemoryRepository', () => {
  describe('create', () => {
    it('should create a user', async () => {
      const userRepository = new UserInMemoryRepository();
      const user = new User({
        email: 'johndoe@email.com',
        name: 'John Doe',
        password: '123456',
      });

      const userCreated = await userRepository.create(user);
      expect(userCreated).toBeInstanceOf(User);
      expect(userCreated.email).toBe(user.email);
      expect(userCreated.name).toBe(user.name);
      expect(userCreated.password).toBe(user.password);
      expect(userCreated.id).toBeDefined();
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const userRepository = new UserInMemoryRepository();
      const user = new User({
        email: 'johndoe@email.com',
        name: 'John Doe',
        password: '123456',
      });

      await userRepository.create(user);
      const foundUser = await userRepository.findByEmail(user.email);
      expect(foundUser).toBeInstanceOf(User);
      expect(foundUser.email).toBe(user.email);
      expect(foundUser.name).toBe(user.name);
      expect(foundUser.password).toBe(user.password);
      expect(foundUser.id).toBeDefined();
    });
  });

  describe('findById', () => {
    it('should find a user by id', async () => {
      const userRepository = new UserInMemoryRepository();
      const user = new User({
        email: 'johndoe@email.com',
        name: 'John Doe',
        password: '123456',
      });
      await userRepository.create(user);
      const foundUser = await userRepository.findById(user.id);
      expect(foundUser).toBeInstanceOf(User);
      expect(foundUser.email).toBe(user.email);
      expect(foundUser.name).toBe(user.name);
      expect(foundUser.password).toBe(user.password);
      expect(foundUser.id).toBeDefined();
    });
  });
});
