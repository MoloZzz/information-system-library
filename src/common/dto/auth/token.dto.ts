import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  token: string;
}
