export interface User {
  sex: number;
  role?: string;
  userid?: string;
  email?: string;
  name?: string;
  address?: string;
  birthday: Date | string;
  not_new_user: boolean;
  phone: number;
  avatar: string | File;
}