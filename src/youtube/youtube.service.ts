import { Injectable } from '@nestjs/common';
import { Innertube } from 'youtubei.js';
import { SearchFilters } from 'youtubei.js/dist/src/Innertube';
import { Observable } from 'rxjs';
import { Credentials } from 'youtubei.js/dist/src/core/OAuth';

// TODO: figure out how to do this better
import HomeFeed from 'youtubei.js/dist/src/parser/youtube/HomeFeed';
import VideoInfo from 'youtubei.js/dist/src/parser/youtube/VideoInfo';
import Search from 'youtubei.js/dist/src/parser/youtube/Search';
import Comments from 'youtubei.js/dist/src/parser/youtube/Comments';
import Library from 'youtubei.js/dist/src/parser/youtube/Library';
import History from 'youtubei.js/dist/src/parser/youtube/History';
import Channel from 'youtubei.js/dist/src/parser/youtube/Channel';
import NotificationsMenu from 'youtubei.js/dist/src/parser/youtube/NotificationsMenu';
import Playlist from 'youtubei.js/dist/src/parser/youtube/Playlist';

// TODO: PUT SOMEWHERE PROPER
export enum YoutubeSessionStatus {
  pending = 'pending',
  success = 'success',
}

export interface YoutubeSessionData {
  verification_url: string;
  user_code: string;
}

export interface YoutubeSession {
  status: YoutubeSessionStatus;
  data?: YoutubeSessionData;
  credentials?: Credentials;
}

@Injectable()
export class YoutubeService {
  // TODO: Inject. New shouldn't be called here. Only the dependency manager should call new and create objects.
  onSessionUpdate(): Observable<YoutubeSession> {
    return new Observable((observer) => {
      this.innertube.session.once('auth-pending', (data) => {
        console.log('Sign in pending');
        observer.next({ status: YoutubeSessionStatus.pending, data });
      });
      this.innertube.session.once('auth', ({ credentials }) => {
        console.log(`Sign in successful`);
        observer.next({ status: YoutubeSessionStatus.success, credentials });
      });
      this.innertube.session.once('auth-error', (error) => {
        console.error(error);
        observer.error(error);
      });
      this.innertube.session.on('update-credentials', ({ credentials }) => {
        console.log(`New credentials`);
        observer.next({ status: YoutubeSessionStatus.success, credentials });
      });
    });
  }

  constructor(private readonly innertube: Innertube) {}

  async signIn(credentails?: Credentials): Promise<void> {
    await this.innertube.session.signIn(credentails);
  }

  async signOut(): Promise<Response | undefined> {
    return this.innertube.session.signOut();
  }

  async getVideo(video_id: string): Promise<VideoInfo> {
    return this.innertube.getInfo(video_id, 'iOS'); // TODO: get this parameter from app
  }

  async getHomeFeed(): Promise<HomeFeed> {
    return this.innertube.getHomeFeed();
  }

  async search(query: string, filters: SearchFilters): Promise<Search> {
    return this.innertube.search(query, filters);
  }

  async getSearchSuggestions(query: string): Promise<string[]> {
    return this.innertube.getSearchSuggestions(query);
  }

  async getComments(
    video_id: string,
    sort_by?: 'TOP_COMMENTS' | 'NEWEST_FIRST',
  ): Promise<Comments> {
    return this.innertube.getComments(video_id, sort_by);
  }

  async getLibrary(): Promise<Library> {
    return this.innertube.getLibrary();
  }

  async getHistory(): Promise<History> {
    return this.innertube.getHistory();
  }

  async getChannel(id: string): Promise<Channel> {
    return this.innertube.getChannel(id);
  }

  async getNotifications(): Promise<NotificationsMenu> {
    return this.innertube.getNotifications();
  }

  async getUnseenNotificationsCount(): Promise<number> {
    return this.innertube.getUnseenNotificationsCount();
  }

  async getPlaylist(id: string): Promise<Playlist> {
    return this.innertube.getPlaylist(id);
  }
}
