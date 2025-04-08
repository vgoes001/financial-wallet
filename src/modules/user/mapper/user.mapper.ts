import { User, UserOutput } from '../entities/user.entity';
import { UserModelAttributes } from '../repository/sequelize/user.model';

export class UserMapper {
  static toOutput(user: User): UserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
      deletedAt: user?.deletedAt,
    };
  }

  static fromModelToEntity(userModel: UserModelAttributes): User {
    if (!userModel) {
      return null;
    }
    return new User(userModel);
  }
}
