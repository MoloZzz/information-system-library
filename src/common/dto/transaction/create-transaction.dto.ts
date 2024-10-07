import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @ApiProperty()
  bookId: number;

  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsString()
  @ApiProperty()
  status: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  comment?: string;

  @IsDate()
  @ApiProperty()
  borrowDate: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  returnDate?: Date;

  @IsNumber()
  @ApiProperty()
  librarianId: number;
}
