import { CategoryTree } from '../../types/categoryTree';

export interface CategoryTreeResponse {
  err: number;
  msg: string;
  response: CategoryTree[];
}

export interface CategoryTreeResponseParent {
  err: number;
  msg: string;
  total: number;
  response: CategoryTree[];
}
