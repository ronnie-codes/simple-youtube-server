import { Module, Global } from '@nestjs/common';
import { YoutubeModule } from './youtube/youtube.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Innertube } from 'youtubei.js';
import { YOUTUBE_REPOSITORY } from './youtube/youtube.constants';
import { YtmusicModule } from './ytmusic/ytmusic.module';
import { YTMUSIC_REPOSITORY } from './ytmusic/ytmusic.constants';
import { DynamicModule } from '@nestjs/common';

@Global()
@Module({})
export class AppModule {
  static create(innertube: Innertube): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot({ ttl: 30, limit: 10 }),
        YoutubeModule,
        YtmusicModule,
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: ThrottlerGuard,
        },
        {
          provide: YOUTUBE_REPOSITORY,
          useValue: innertube,
        },
        {
          provide: YTMUSIC_REPOSITORY,
          useValue: innertube.music,
        },
      ],
      exports: [YOUTUBE_REPOSITORY, YTMUSIC_REPOSITORY],
    };
  }
}
