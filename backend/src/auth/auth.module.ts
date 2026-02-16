import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { AuditLog } from '../audit-logs/audit-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuditLog]),
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key-change-this',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}