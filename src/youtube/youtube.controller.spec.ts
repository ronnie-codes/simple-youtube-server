import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';

describe('YoutubeController', () => {
  let controller: YoutubeController;

  beforeEach(async () => {
    const mockYoutubeService = {
      getTrack: jest.fn().mockResolvedValue({}),
      getHomeFeed: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [YoutubeController],
      providers: [
        {
          provide: YoutubeService,
          useValue: mockYoutubeService,
        },
      ],
    }).compile();

    controller = module.get<YoutubeController>(YoutubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
