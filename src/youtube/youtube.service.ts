import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  YoutubeRepository,
  YoutubeSession,
  YoutubeSessionCredentials,
} from './interfaces/youtube.interface';

@Injectable()
export class YoutubeService {
  constructor(private readonly repository: YoutubeRepository) {}

  onSessionUpdate(): Observable<YoutubeSession> {
    // TODO: Inject observable
    return new Observable((observer) => {
      this.repository.session.once('auth-pending', (data) => {
        console.debug('Sign in pending');
        observer.next({ status: 'pending', data });
      });
      this.repository.session.once('auth', ({ credentials }) => {
        console.debug(`Sign in successful`);
        observer.next({ status: 'success', credentials });
      });
      this.repository.session.once('auth-error', (error) => {
        console.error(error);
        observer.error(error);
      });
      this.repository.session.on('update-credentials', ({ credentials }) => {
        console.debug(`New credentials`);
        observer.next({ status: 'success', credentials });
      });
    });
  }

  async signIn(credentails?: YoutubeSessionCredentials): Promise<void> {
    await this.repository.session.signIn(credentails);
  }

  async getVideo(video_id: string): Promise<any> {
    return this.repository.getInfo(video_id, 'iOS'); // TODO: get this parameter from app
  }

  async getHomeFeed(): Promise<any> {
    return this.repository.getHomeFeed();
  }
}
