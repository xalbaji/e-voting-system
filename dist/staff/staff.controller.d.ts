import { StaffService } from './staff.service';
export declare class StaffController {
    private staffService;
    constructor(staffService: StaffService);
    getDashboard(req: any): Promise<import("./staff.service").DashboardStats>;
    getVoterRequests(limit: string, req: any): Promise<import("../users/user.entity").User[]>;
    getVoters(search: string, status: string, req: any): Promise<import("../users/user.entity").User[]>;
    approveVoter(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    rejectVoter(id: string, body: {
        reason: string;
    }, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllElections(req: any): Promise<import("../elections/election.entity").Election[]>;
    getElectionsWithStats(req: any): Promise<{
        active: import("./staff.service").ElectionStats[];
        upcoming: import("./staff.service").UpcomingElectionStats[];
        completed: import("./staff.service").ElectionStats[];
    }>;
    getCompletedElections(req: any): Promise<import("../elections/election.entity").Election[]>;
    getElectionReport(id: string, req: any): Promise<import("./staff.service").ElectionReport>;
    getRecentActivities(limit: string, req: any): Promise<import("../audit-logs/audit-log.entity").AuditLog[]>;
}
