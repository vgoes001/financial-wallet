import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { UserOutput } from '../entities/user.entity';
import { CreateUserUseCase } from '../use-cases/create-user/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInUserUseCase } from '../use-cases/sign-in/sign-in.use-case';
import { AuthUserDto } from './dtos/auth-user.dto';

@Controller('users')
export class UserController {
  @Inject(CreateUserUseCase)
  private createUserUseCase: CreateUserUseCase;

  @Inject(SignInUserUseCase)
  private signInUserUseCase: SignInUserUseCase;

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserOutput> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async auth(@Body() authUserDto: AuthUserDto) {
    return this.signInUserUseCase.execute(authUserDto);
  }
}
