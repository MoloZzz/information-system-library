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

  /*
  INSERT INTO employees (user_id, position, hire_date, role, email, password)
  VALUES (:userId, :position, :hireDate, :role, :email, :password);
  */
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  /*
  SELECT * FROM employees;
  */
  async findAll() {
    return this.employeeRepository.find();
  }

  /*
  SELECT * FROM employees WHERE id = :id;
  */
  async findOne(id: number) {
    return this.employeeRepository.findOne({ where: { id } });
  }

  /*
  SELECT * FROM employees WHERE email = :email;
  */
  async findByEmail(email: string) {
    return this.employeeRepository.findOne({ where: { email } });
  }

  /*
  UPDATE employees
  SET user_id = :userId, position = :position, hire_date = :hireDate,
      role = :role, email = :email, password = :password
  WHERE id = :id;
  */
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  /*
  DELETE FROM employees WHERE id = :id;
  */
  async remove(id: number) {
    return this.employeeRepository.delete(id);
  }
}
