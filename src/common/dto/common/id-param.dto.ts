import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class IdParamDto {
  @ApiProperty()
  @IsDefined()
  @Type(() => Number)
  @IsNumber()
  id: number;
}
