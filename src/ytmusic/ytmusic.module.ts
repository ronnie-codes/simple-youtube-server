import { Module, Inject } from '@nestjs/common';
import { YtmusicService } from './ytmusic.service';
import { YtmusicController } from './ytmusic.controller';
import { YtmusicRepository } from './interfaces/ytmusic.interface';
import { YTMUSIC_REPOSITORY } from './ytmusic.constants';

@Module({
  controllers: [YtmusicController],
  providers: [
    {
      provide: YtmusicService,
      useFactory: (repository: YtmusicRepository) => {
        return new YtmusicService(repository);
      },
      inject: [YTMUSIC_REPOSITORY],
    },
  ],
})
export class YtmusicModule {
  constructor(
    @Inject(YTMUSIC_REPOSITORY) private readonly repository: YtmusicRepository,
  ) {}
}
