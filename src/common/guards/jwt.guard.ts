import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('JWT_AUTH') {}
