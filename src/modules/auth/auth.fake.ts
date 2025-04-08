import { hash } from 'node:crypto';
import { IAuthService } from './auth.interface';

export class AuthFake implements IAuthService {
  async hashPassword(password: string): Promise<string> {
    return hash('sha256', password);
  }
}
