import { hash } from 'node:crypto';
import { IAuthService } from './auth.interface';

export class AuthFake implements IAuthService {
  getBearerToken(request: any): string {
    throw new Error('Method not implemented.');
  }
  validateToken(token: string, secret: string) {
    throw new Error('Method not implemented.');
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const hashedPassword = await this.hashPassword(password);
    return hashedPassword === hash;
  }

  async generateToken(payload: any): Promise<string> {
    return `fake-token-${JSON.stringify(payload)}`;
  }

  async hashPassword(password: string): Promise<string> {
    return hash('sha256', password);
  }
}
