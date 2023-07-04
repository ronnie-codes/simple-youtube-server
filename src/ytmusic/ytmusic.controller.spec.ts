import { Test, TestingModule } from '@nestjs/testing';
import { YtmusicController } from './ytmusic.controller';
import { YtmusicService } from './ytmusic.service';

describe('YtmusicController', () => {
  let controller: YtmusicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YtmusicController],
      providers: [YtmusicService],
    }).compile();

    controller = module.get<YtmusicController>(YtmusicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
