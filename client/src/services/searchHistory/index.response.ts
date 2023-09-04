import { SearchHistory } from '../../types/searchHistory';

export interface SearchHistoryResponse {
  err: number;
  msg: string;
  response: SearchHistory[];
}
export interface CreateSearchHistoryResponse {
  err: number;
  msg: string;
  response: any;
}
