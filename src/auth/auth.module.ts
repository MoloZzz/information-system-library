import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthStrategy } from 'src/common/strategies/jwt-auth.strategy';
import { EmployeesService } from 'src/employees/employees.service';
import { EmployeesModule } from 'src/employees/employees.module';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'JWT_AUTH' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => EmployeesModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
})
export class AuthModule {}
