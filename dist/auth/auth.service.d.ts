import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { AuditLog } from '../audit-logs/audit-log.entity';
export declare class AuthService {
    private userRepository;
    private auditLogRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, auditLogRepository: Repository<AuditLog>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any, ipAddress: string): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            first_name: any;
            last_name: any;
            role: any;
            status: any;
        };
    }>;
    register(userData: any, ipAddress: string): Promise<{
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        voter_id: string;
        date_of_birth: Date;
        profile_photo: string;
        role: string;
        status: string;
        created_at: Date;
        updated_at: Date;
    }>;
    logout(userId: number, userEmail: string, ipAddress: string): Promise<{
        message: string;
    }>;
}
