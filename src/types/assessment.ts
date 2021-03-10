import { Document } from 'mongoose';

import { User } from './user';

export interface ResultRiasec {
  realistic: string;
  investigate: string;
  artistic: string;
  social: string;
  enterprising: string;
  conventional: string;
}

export interface Assessment extends Document {
  owner: User;
  title: string;
  status: boolean;
  result: string;
  result_riasec: ResultRiasec;
  created: Date;
}
