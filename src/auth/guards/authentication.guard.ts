import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    console.log('Inside the authenticationGuard');
    try {
      // throw new TokenExpiredError('jwt expired', new Date());
      const accessToken = request.headers.authorization.split(' ')[1];
      if (!accessToken) {
        throw new UnauthorizedException('Access token is missing');
      }

      this.authService.verifyToken(accessToken);
      return true;
    } catch (error) {
      // console.log('request.body.refreshToken', request.body.refreshToken);

      if (error instanceof TokenExpiredError && request.body.refreshToken) {
        try {
          console.log('No segundo try');

          const tokens = await this.authService.refreshTokens(
            request.body.refreshToken,
          );
          response.setHeader('new-access-token', tokens.accessToken);
          response.setHeader('new-refresh-token', tokens.refreshToken.token);
          request.user = tokens.accessToken;
          request.headers['new-access-token'] = `Bearer ${tokens.accessToken}`;

          return true;
        } catch (refreshError) {
          throw new UnauthorizedException('Invalid refresh token');
        }
      }
      console.log(error);
      throw new UnauthorizedException('Primeiro erro');
    }
  }
}
