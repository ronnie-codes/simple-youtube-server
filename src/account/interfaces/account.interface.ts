export interface AccountRepository {
  signIn(credentials?: AccountCredentials): Promise<void>;

  on(type: string, listener: (...args: any[]) => void): void;
  once(type: string, listener: (...args: any[]) => void): void;
}

export interface Account {
  status: AccountStatus;
  data?: AccountVerification;
  credentials?: AccountCredentials;
}

export type AccountStatus = 'pending' | 'success';

export interface AccountCredentials {
  access_token: string;
  refresh_token: string;
  expires: Date;
}

export interface AccountVerification {
  verification_url: string;
  user_code: string;
}
