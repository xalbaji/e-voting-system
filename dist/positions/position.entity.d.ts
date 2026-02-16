import { Election } from '../elections/election.entity';
import { Candidate } from '../candidates/candidate.entity';
export declare class Position {
    id: number;
    position_name: string;
    description: string;
    max_votes: number;
    election: Election;
    election_id: number;
    candidates: Candidate[];
    created_at: Date;
}
