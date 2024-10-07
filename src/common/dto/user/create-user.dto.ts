import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  fullName: string;

  @ApiProperty()
  @IsString()
  @Length(7, 15)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  formId: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  registrationDate: Date;
}
