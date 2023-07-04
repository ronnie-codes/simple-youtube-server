import { Module, Global, DynamicModule } from '@nestjs/common';
import { YoutubeModule } from './youtube/youtube.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Innertube } from 'youtubei.js';
import { YOUTUBE_REPOSITORY } from './youtube/youtube.constants';
import { YtmusicModule } from './ytmusic/ytmusic.module';
import { YTMUSIC_REPOSITORY } from './ytmusic/ytmusic.constants';
import { AccountModule } from './account/account.module';
import { ACCOUNT_REPOSITORY } from './account/account.constants';

@Global()
@Module({})
export class AppModule {
  public static create(innertube: Innertube): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot({ ttl: 30, limit: 10 }),
        AccountModule,
        YoutubeModule,
        YtmusicModule,
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: ThrottlerGuard,
        },
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: innertube.session,
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
      exports: [ACCOUNT_REPOSITORY, YOUTUBE_REPOSITORY, YTMUSIC_REPOSITORY],
    };
  }
}
