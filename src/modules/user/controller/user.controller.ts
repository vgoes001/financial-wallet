import {
  Body,
  Controller,
  Get,
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
import { CreateUserDocs, CurrentBalanceDocs, SignInDocs } from './user.docs';
import { Public } from 'src/modules/auth/decorators/public.decorator';
import { UserId } from 'src/modules/shared/decorators/user-id.decorator';
import { CurrentBalanceUseCase } from '../use-cases/current-balance/current-balance.use-case';

@Controller('users')
export class UserController {
  @Inject(CreateUserUseCase)
  private createUserUseCase: CreateUserUseCase;

  @Inject(SignInUserUseCase)
  private signInUserUseCase: SignInUserUseCase;

  @Inject(CurrentBalanceUseCase)
  private currentBalanceUseCase: CurrentBalanceUseCase;

  @CreateUserDocs
  @Public()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserOutput> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @SignInDocs
  @Public()
  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async auth(@Body() authUserDto: AuthUserDto) {
    return this.signInUserUseCase.execute(authUserDto);
  }

  @CurrentBalanceDocs
  @Get('me/wallet')
  async currentBalance(@UserId() userId: string) {
    return {
      balance: await this.currentBalanceUseCase.execute({ userId }),
    };
  }
}
