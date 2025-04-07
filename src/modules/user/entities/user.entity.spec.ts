import { User, UserCreateProps } from './user.entity';

const validUserInput: UserCreateProps = {
  email: 'johndoe@example.com',
  name: 'John Doe',
  password: '123456',
};

describe('UserEntity', () => {
  describe('constructor', () => {
    it('should create an instance of UsuarioEntity', () => {
      const uuid = ' f945a5e1-7bb1-4e00-8379-a5e6726295d7';
      const user = new User({
        ...validUserInput,
        id: uuid,
      });
      expect(user).toBeInstanceOf(User);
      expect(user.email).toBe(validUserInput.email);
      expect(user.name).toBe(validUserInput.name);
      expect(user.password).toBe(validUserInput.password);
      expect(user.id).toBeDefined();
      expect(user.id).toBe(uuid);
      expect(user.createdAt).toBeUndefined();
      expect(user.updatedAt).toBeUndefined();
      expect(user.deletedAt).toBeUndefined();
    });

    it('should create an instance of UserEntity with updatedAt, createdAt and deletedAt', () => {
      const uuid = ' f945a5e1-7bb1-4e00-8379-a5e6726295d7';
      const user = new User({
        ...validUserInput,
        id: uuid,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      });
      expect(user).toBeInstanceOf(User);
      expect(user.email).toBe(validUserInput.email);
      expect(user.name).toBe(validUserInput.name);
      expect(user.password).toBe(validUserInput.password);
      expect(user.id).toBeDefined();
      expect(user.id).toBe(uuid);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
      expect(user.deletedAt).toBeInstanceOf(Date);
    });
  });

  describe('create', () => {
    it('should create an instance of UserEntity', () => {
      const user = User.create(validUserInput);
      expect(user).toBeInstanceOf(User);
      expect(user.email).toBe(validUserInput.email);
      expect(user.name).toBe(validUserInput.name);
      expect(user.password).toBe(validUserInput.password);
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeUndefined();
      expect(user.updatedAt).toBeUndefined();
      expect(user.deletedAt).toBeUndefined();
    });
  });

  describe('changePassword', () => {
    it('should change the password of the user', () => {
      const user = User.create(validUserInput);
      const newPassword = 'newpassword';
      user.changePassword(newPassword);
      expect(user.password).toBe(newPassword);
    });
  });
});
