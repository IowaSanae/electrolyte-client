import { Notification } from '../../types/notifycation';

export interface NotificationResponse {
  err: number;
  msg: string;
  response: Notification[];
}
