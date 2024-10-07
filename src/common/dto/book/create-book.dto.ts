import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional, IsBoolean } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(10, 13)
  ISBN?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  publisher?: string;
}
