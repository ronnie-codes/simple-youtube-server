export interface YoutubeRepository {
  session: {
    signIn(credentials?: YoutubeSessionCredentials): Promise<void>;

    on(type: string, listener: (...args: any[]) => void): void;
    once(type: string, listener: (...args: any[]) => void): void;
  };

  getHomeFeed(): any;
  getInfo(video_id: string, client?: string): any;
}

export interface YoutubeSession {
  status: YoutubeSessionStatus;
  data?: YoutubeSessionData;
  credentials?: YoutubeSessionCredentials;
}

export type YoutubeSessionStatus = 'pending' | 'success';

export interface YoutubeSessionCredentials {
  access_token: string;
  refresh_token: string;
  expires: Date;
}

export interface YoutubeSessionData {
  verification_url: string;
  user_code: string;
}
