import { Test, TestingModule } from '@nestjs/testing';
import { YtmusicController } from './ytmusic.controller';
import { YtmusicService } from './ytmusic.service';

describe('YtmusicController', () => {
  let controller: YtmusicController;

  beforeEach(async () => {
    const mockYtmusicService = {
      getTrack: jest.fn().mockResolvedValue({}),
      getHomeFeed: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [YtmusicController],
      providers: [
        {
          provide: YtmusicService,
          useValue: mockYtmusicService,
        },
      ],
    }).compile();

    controller = module.get<YtmusicController>(YtmusicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
