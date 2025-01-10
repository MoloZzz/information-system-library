import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'JWT_AUTH') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtAuthStrategy.ExtractJwtFromHeader,
      ]),
      signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_TIME') },
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(req: Request) {
    const token = JwtAuthStrategy.ExtractJwtFromHeader(req);
    return this.authService.validateToken(token);
  }

  private static ExtractJwtFromHeader(req: Request) {
    if (req.headers.authorization) {
      return req.headers.authorization.slice(7);
    }
    return;
  }
}
