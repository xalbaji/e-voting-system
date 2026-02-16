import { Election } from '../elections/election.entity';
import { Position } from '../positions/position.entity';
import { Candidate } from '../candidates/candidate.entity';
import { User } from '../users/user.entity';
export declare class Vote {
    id: number;
    election: Election;
    election_id: number;
    position: Position;
    position_id: number;
    candidate: Candidate;
    candidate_id: number;
    voter: User;
    voter_id: number;
    voted_at: Date;
}
