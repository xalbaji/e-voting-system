import { User } from '../users/user.entity';
import { Position } from '../positions/position.entity';
export declare class Election {
    id: number;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    status: string;
    created_by: User;
    created_by_id: number;
    positions: Position[];
    created_at: Date;
}
