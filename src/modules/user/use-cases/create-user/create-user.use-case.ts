import { BadRequestException } from '@nestjs/common';
import { IUserRepository } from '../../repository/user-repository';
import { UserMapper } from '../../mapper/user.mapper';
import { User } from '../../entities/user.entity';
import { CreateUserInput } from './create-user.input';
import { IAuthService } from 'src/modules/auth/auth.interface';
import { IFinancialEventRepository } from 'src/modules/financial-events/repository/financial-event.repository';
import { FinancialEvent } from 'src/modules/financial-events/entities/financial-event.entity';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private financialEventRepository: IFinancialEventRepository,
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
    const financialEvent = FinancialEvent.createInitialCredit(userCreated.id);
    await this.financialEventRepository.create(financialEvent);

    return UserMapper.toOutput(userCreated);
  }
}
