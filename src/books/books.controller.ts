import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateBookDto, UpdateBookDto } from 'src/common/dto';
import { BooksService } from './books.service';

@Controller('books')
@ApiTags('Books API')
@UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  async create(@Body() createBookDto: CreateBookDto) {
    return this.service.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by id' })
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.service.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  async remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
