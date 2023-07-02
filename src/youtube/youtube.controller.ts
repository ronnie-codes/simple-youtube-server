import { Body, Controller, Get, Post, Sse, Param } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { MessageEvent } from './dto/message-event.dto';
import { YoutubeService } from './youtube.service';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly service: YoutubeService) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.service.onSessionUpdate().pipe(
      map((data) => {
        return { data };
      }),
    );
  }

  @Post('sign-in')
  async signIn(@Body() signInDTO: SignInDTO): Promise<void> {
    const credentials = signInDTO.credentials;

    if (credentials) {
      return this.service.signIn({
        access_token: credentials.access_token,
        refresh_token: credentials.refresh_token,
        expires: credentials.expires,
      });
    }
    return this.service.signIn();
  }

  @Get('video/:id')
  async getVideo(@Param('id') id: string): Promise<any> {
    return this.service.getVideo(id);
  }

  @Get('home-feed')
  async getHomeFeed(): Promise<any> {
    return this.service.getHomeFeed();
  }
}
