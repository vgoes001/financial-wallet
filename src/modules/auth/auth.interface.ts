export interface IAuthService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateToken(payload: any): Promise<string>;
  getBearerToken(request: any): string;
  validateToken(token: string, secret: string): any;
}
