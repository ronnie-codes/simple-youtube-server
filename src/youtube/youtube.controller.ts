import { Body, Controller, Get, Post, Sse, Param } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { MessageEvent } from './dto/message-event.dto';
import { YoutubeService } from './youtube.service';
import { SignInDTO } from './dto/sign-in.dto';
import HomeFeed from 'youtubei.js/dist/src/parser/youtube/HomeFeed';
import VideoInfo from 'youtubei.js/dist/src/parser/youtube/VideoInfo';
import Library from 'youtubei.js/dist/src/parser/youtube/Library';
import History from 'youtubei.js/dist/src/parser/youtube/History';
import Search from 'youtubei.js/dist/src/parser/youtube/Search';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.youtubeService.onSessionUpdate().pipe(
      map((data) => {
        return { data };
      }),
    );
  }

  @Post('sign-in')
  async signIn(@Body() signInDTO: SignInDTO): Promise<void> {
    const credentials = signInDTO.credentials;

    if (credentials) {
      return this.youtubeService.signIn({
        access_token: credentials.access_token,
        refresh_token: credentials.refresh_token,
        expires: credentials.expires,
      });
    }
    return this.youtubeService.signIn();
  }

  @Post('sign-out')
  async signOut(): Promise<Response | undefined> {
    return this.youtubeService.signOut();
  }

  @Get('video/:id')
  async getVideo(@Param('id') id: string): Promise<VideoInfo> {
    return this.youtubeService.getVideo(id);
  }

  @Get('search')
  async search(): Promise<Search> {
    return this.youtubeService.search('', { type: 'video' });
  }

  @Get('home-feed')
  async getHomeFeed(): Promise<HomeFeed> {
    return this.youtubeService.getHomeFeed();
  }

  @Get('library')
  async getLibrary(): Promise<Library> {
    return this.youtubeService.getLibrary();
  }

  @Get('history')
  async getHistory(): Promise<History> {
    return this.youtubeService.getHistory();
  }
}
