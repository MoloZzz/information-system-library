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
import { CreateEmployeeDto, UpdateEmployeeDto } from 'src/common/dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
@ApiTags('Employees API')
@UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.service.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an employee by id' })
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an employee' })
  async update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.service.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee' })
  async remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
