import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'src/common/dto';
import { EmployeeEntity } from 'src/common/entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async findAll() {
    return this.employeeRepository.find();
  }

  async findOne(id: number) {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.employeeRepository.findOne({ where: { email } });
  }  

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  async remove(id: number) {
    return this.employeeRepository.delete(id);
  }
}
