import { Banner } from '../../types/banner';

export interface BannerResponse {
  err: number;
  total: string;
  response: Banner[];
  msg: string;
}
