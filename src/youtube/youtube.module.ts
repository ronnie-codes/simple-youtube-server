import { Module, Inject } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { YoutubeRepository } from './interfaces/youtube.interface';
import { YOUTUBE_REPOSITORY } from './youtube.constants';

@Module({
  controllers: [YoutubeController],
  providers: [
    {
      provide: YoutubeService,
      useFactory: (repository: YoutubeRepository) => {
        return new YoutubeService(repository);
      },
      inject: [YOUTUBE_REPOSITORY],
    },
  ],
})
export class YoutubeModule {
  constructor(
    @Inject(YOUTUBE_REPOSITORY) private readonly repository: YoutubeRepository,
  ) {}
}
