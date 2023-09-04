import { User } from '../../types/user';

export interface UserResponse {
    err: number;
    msg: string;
    response: User;
}