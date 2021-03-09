export interface Payload {
  email: string;
  student: boolean;
  membership: boolean;
  iat?: number;
  expiresIn?: string;
}
