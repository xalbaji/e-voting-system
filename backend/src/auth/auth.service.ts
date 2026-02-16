import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { AuditLog } from '../audit-logs/audit-log.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ 
      where: { email } 
    });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, ipAddress: string) {
    // Staff and Admin can always login regardless of status
    if (user.role === 'staff' || user.role === 'admin') {
      // Allow login - staff and admin don't need approval
      const payload = { email: user.email, sub: user.id, role: user.role };
      
      // Create audit log
      await this.auditLogRepository.save({
        user_id: user.id,
        user_email: user.email,
        action: 'User logged in',
        ip_address: ipAddress,
        details: `Login from ${ipAddress}`
      });
      
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          status: user.status || 'approved'
        }
      };
    }
    
    // For voters, check if approved
    if (user.role === 'voter' && user.status !== 'approved') {
      throw new UnauthorizedException('Your account is pending approval');
    }
    
    const payload = { email: user.email, sub: user.id, role: user.role };
    
    // Create audit log
    await this.auditLogRepository.save({
      user_id: user.id,
      user_email: user.email,
      action: 'User logged in',
      ip_address: ipAddress,
      details: `Login from ${ipAddress}`
    });
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        status: user.status
      }
    };
  }

  async register(userData: any, ipAddress: string) {
    // Check if user exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: userData.email },
        { voter_id: userData.voter_id }
      ]
    });
    
    if (existingUser) {
      throw new UnauthorizedException('Email or Voter ID already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Create user
    const user = this.userRepository.create({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone: userData.phone,
      voter_id: userData.voter_id,
      date_of_birth: userData.date_of_birth,
      password: hashedPassword,
      status: 'pending',
      role: 'voter'
    });
    
    await this.userRepository.save(user);
    
    // Create audit log
    await this.auditLogRepository.save({
      user_id: user.id,
      user_email: user.email,
      action: 'User registered',
      ip_address: ipAddress,
      details: `New registration from ${ipAddress}`
    });
    
    const { password, ...result } = user;
    return result;
  }

  async logout(userId: number, userEmail: string, ipAddress: string) {
    await this.auditLogRepository.save({
      user_id: userId,
      user_email: userEmail,
      action: 'User logged out',
      ip_address: ipAddress,
      details: `Logout from ${ipAddress}`
    });
    
    return { message: 'Logged out successfully' };
  }
}