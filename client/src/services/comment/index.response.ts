import { Comment } from '../../types/comment';

export interface CommentsResponse {
  err: number;
  msg: string;
  page: number;
  limit: number;
  totalPage: number;
  totalItem: number;
  response: Comment[];
}
