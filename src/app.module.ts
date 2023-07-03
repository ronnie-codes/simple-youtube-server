import { Module, Global } from '@nestjs/common';
import { YoutubeModule } from './youtube/youtube.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Innertube } from 'youtubei.js';
import { APP_YOUTUBE } from './constants';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({ ttl: 30, limit: 10 }),
    YoutubeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_YOUTUBE,
      useFactory: async () => await Innertube.create(),
    },
  ],
  exports: [APP_YOUTUBE],
})
export class AppModule {}
