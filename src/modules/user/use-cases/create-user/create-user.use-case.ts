import { BadRequestException } from '@nestjs/common';
import { IUserRepository } from '../../repository/user-repository';
import { UserMapper } from '../../mapper/user.mapper';
import { User } from '../../entities/user.entity';
import { CreateUserInput } from './create-user.input';
import { IAuthService } from 'src/modules/auth/auth.interface';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService,
  ) {}

  async execute(input: CreateUserInput) {
    const user = User.create(input);

    const userAlreadyExists = await this.userRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.authService.hashPassword(user.password);
    user.changePassword(hashedPassword);

    const userCreated = await this.userRepository.create(user);

    return UserMapper.toOutput(userCreated);
  }
}
