import { IAuthService } from 'src/modules/auth/auth.interface';
import { IUserRepository } from '../../repository/user-repository';
import { SignInInput } from './sign-in.input';
import { SignInOutput } from './sign-in.output';
import { BadRequestException } from '@nestjs/common';

export class SignInUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService,
  ) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new BadRequestException('User or password incorrect');
    }

    const passwordMatch = await this.authService.comparePassword(
      input.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException('User or password incorrect');
    }

    const token = await this.authService.generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      token,
    };
  }
}
