import { compare, hash } from 'bcrypt';

import { IAuthService } from './auth.interface';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class AuthServiceImpl implements IAuthService {
  @Inject(JwtService)
  private jwtService: JwtService;

  hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
  comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
  generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
