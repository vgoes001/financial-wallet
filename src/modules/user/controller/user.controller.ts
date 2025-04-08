import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserOutput } from '../entities/user.entity';
import { CreateUserUseCase } from '../use-cases/create-user/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  @Inject(CreateUserUseCase)
  private createUserUseCase: CreateUserUseCase;

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserOutput> {
    return this.createUserUseCase.execute(createUserDto);
  }
}
