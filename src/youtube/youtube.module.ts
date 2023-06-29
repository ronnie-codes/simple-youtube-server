import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { Innertube } from 'youtubei.js';

@Module({
  controllers: [YoutubeController],
  providers: [
    {
      provide: YoutubeService,
      useFactory: async () => new YoutubeService(await Innertube.create()),
    },
  ],
})
export class YoutubeModule {}
