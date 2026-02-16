import { Position } from '../positions/position.entity';
export declare class Candidate {
    id: number;
    first_name: string;
    last_name: string;
    photo: string;
    biography: string;
    status: string;
    position: Position;
    position_id: number;
    created_at: Date;
    get fullName(): string;
}
