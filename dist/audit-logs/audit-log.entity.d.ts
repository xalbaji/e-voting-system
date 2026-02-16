export declare class AuditLog {
    id: number;
    user_id: number;
    user_email: string;
    action: string;
    ip_address: string;
    details: string;
    created_at: Date;
}
