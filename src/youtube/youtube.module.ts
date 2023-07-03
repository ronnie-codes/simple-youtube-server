import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { YoutubeRepository } from './interfaces/youtube.interface';
import { Inject } from '@nestjs/common';
import { APP_YOUTUBE } from 'src/constants';

@Module({
  controllers: [YoutubeController],
  providers: [
    {
      provide: YoutubeService,
      useFactory: (repository: YoutubeRepository) => {
        return new YoutubeService(repository);
      },
      inject: [APP_YOUTUBE],
    },
  ],
})
export class YoutubeModule {
  constructor(
    @Inject(APP_YOUTUBE) private readonly repository: YoutubeRepository,
  ) {}
}
