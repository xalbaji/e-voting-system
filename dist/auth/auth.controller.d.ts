import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }, req: any): Promise<{
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
    register(body: any, req: any): Promise<{
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
    logout(req: any): Promise<{
        message: string;
    }>;
}
