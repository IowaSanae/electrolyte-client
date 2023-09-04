import { Rooms } from '../../types/room';

export interface RoomsResponse {
    err: number;
    msg: string;
    total: number;
    response: Rooms[];
}