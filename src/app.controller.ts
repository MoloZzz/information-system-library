import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './common/guards/jwt.guard';

@Controller()
@ApiTags('Basic url')
export class AppController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Check the availability of the service' })
  async getHello() {
    return { message: 'Hello World!' };
  }

  @Get('protected')
  @ApiOperation({ summary: 'Protected method ping' })
  @UseGuards(JwtGuard)
  async ping() {
    return { message: 'pong' };
  }
}
