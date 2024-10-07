import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, EntityWithCredsDto } from 'src/common/dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(creds: EntityWithCredsDto) {
    const payload = { login: creds.username, sub: creds.id };
    return this.jwtService.sign(payload);
  }

  async login(username: string, password: string) {
    const creds = {} as EntityWithCredsDto; // Отримуємо по username дані
    if (!creds) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, creds.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.generateToken(creds),
      user: {
        /* тут буде юзер під яким логінимось*/
      },
    };
  }

  async refreshToken(token: string) {
    const decodedToken = this.jwtService.verify(token);
    const user: any = {}; // отримуємо entity по entityType, entityId;
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.generateToken(user);
  }

  async validateToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      const user: any = {}; // отримуємо entity по id;
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }

  async register(registerEmployee: any) {
    //const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    //const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    //return this.userRepository.save(user);
  }
}
