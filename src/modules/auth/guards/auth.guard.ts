import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAuthService } from '../auth.interface';
import { ConfigService } from '@nestjs/config';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: IAuthService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      const token = this.jwtService.getBearerToken(request);
      if (token) {
        await this.validateAndAttachUserToRequest(request, token);
      }
      return true;
    }

    const token = this.jwtService.getBearerToken(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    await this.validateAndAttachUserToRequest(request, token);
    return true;
  }

  private async validateAndAttachUserToRequest(
    request: Request,
    token: string,
  ) {
    try {
      const secret = await this.configService.get('JWT_SECRET');
      const payload = await this.jwtService.validateToken(token, secret);

      request['user'] = payload;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }

      throw new UnauthorizedException('Invalid token');
    }
  }
}
