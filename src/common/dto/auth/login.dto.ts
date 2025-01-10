import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(4, 255)
  username: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(6, 255)
  password: string;
}
