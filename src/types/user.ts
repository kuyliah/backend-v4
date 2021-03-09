import { Document } from 'mongoose';

export interface Address {
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  country: string;
  zip: number;
}

export interface Assessment {
  status: boolean;
  title: string;
  result: string;
  result_riasec: string;
}

export interface User extends Document {
  email: string;
  readonly password: string;
  student: boolean;
  membership: boolean;
  address: Address;
  assessment: Assessment;
  created: Date;
  fullname: string;
}
