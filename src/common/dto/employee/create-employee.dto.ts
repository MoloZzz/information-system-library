import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsDate, IsEnum } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  fullName: string;

  @ApiProperty()
  @IsString()
  @Length(1, 255)
  position: string;

  @ApiProperty()
  @IsDate()
  employmentDate: Date;

  @ApiProperty()
  @IsEnum(['admin', 'librarian'])
  role: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
