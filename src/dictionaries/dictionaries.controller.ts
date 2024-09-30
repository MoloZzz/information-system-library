import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { DictionariesService } from './dictionaries.service';
import { NameParamDto } from 'src/common/dto';

@ApiTags('System dictionaries API')
@Controller('dictionaries')
@UseGuards(JwtGuard)
export class DictionariesController {
  constructor(private service: DictionariesService) {}

  @Get(':name')
  @ApiOperation({ summary: 'Retrieve dictionary by name' })
  @ApiCookieAuth()
  public async getAll(@Param() params: NameParamDto) {
    return await this.service.getAll(params.name);
  }
}
