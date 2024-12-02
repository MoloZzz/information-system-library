import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateEmployeeDto, CreateUserDto, EntityWithCredsDto } from 'src/common/dto';
import { EmployeeEntity } from 'src/common/entities/employee.entity';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly employeesService: EmployeesService,
  ) {}

  generateToken(employee: EmployeeEntity) {
    const payload = { email: employee.email, sub: employee.id };
    return this.jwtService.sign(payload);
  }

  async login(email: string, password: string) {
    const employee = await this.employeesService.findByEmail(email);
    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.generateToken(employee),
      employee,
    };
  }

  async refreshToken(token: string) {
    const decodedToken = this.jwtService.verify(token);
    const employee = await this.employeesService.findOne(decodedToken.sub);
    if (!employee) {
      throw new UnauthorizedException('Employee not found');
    }
    return this.generateToken(employee);
  }

  async register(registerEmployeeDto: CreateEmployeeDto) {
    const hashedPassword = await bcrypt.hash(registerEmployeeDto.password, 10);
    const employee = await this.employeesService.create({
      ...registerEmployeeDto,
      password: hashedPassword,
    });
    return {
      accessToken: this.generateToken(employee),
      employee,
    };
  }

  async validateToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      const employee = await this.employeesService.findOne(decodedToken.sub);
      if (!employee) {
        throw new UnauthorizedException('Employee not found');
      }
      return employee;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}

