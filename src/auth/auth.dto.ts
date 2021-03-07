import { Address } from '../types/user';
import { Assessment } from '../types/user';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  student?: boolean;
  address?: Address;
  assessment?: Assessment;
}
