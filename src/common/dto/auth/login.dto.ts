import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty() 
  @IsDefined()
  @IsString()
  username: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  password: string;
}
