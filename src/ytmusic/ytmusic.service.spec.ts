import { Test, TestingModule } from '@nestjs/testing';
import { YtmusicService } from './ytmusic.service';

describe('YtmusicService', () => {
  let service: YtmusicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YtmusicService],
    }).compile();

    service = module.get<YtmusicService>(YtmusicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
