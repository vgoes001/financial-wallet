import { User } from '../../entities/user.entity';
import { UserMapper } from '../../mapper/user.mapper';
import { IUserRepository } from '../user-repository';
import { UserModel } from './user.model';

export class UserSequelizeRepository implements IUserRepository {
  constructor(private readonly userModel: typeof UserModel) {}

  async create(user: User): Promise<User> {
    const newUser = await this.userModel.create(user);
    return UserMapper.fromModelToEntity(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return UserMapper.fromModelToEntity(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      return null;
    }
    return UserMapper.fromModelToEntity(user);
  }
}
