import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateEmployeeDto, LoginDto, TokenDto } from 'src/common/dto';

@Controller('auth')
@ApiTags('Authorization  API')
@UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/registration')
  @ApiOperation({ summary: 'Registration' })
  async registration(@Body() body: CreateEmployeeDto) {
    return this.service.register(body);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  async loginEmloyee(@Body() body: LoginDto) {
    return this.service.login(body.username, body.password);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh' })
  async refreshToken(@Body() body: TokenDto) {
    return this.service.refreshToken(body.token);
  }
}
