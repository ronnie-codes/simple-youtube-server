import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeService } from './youtube.service';
import { YoutubeRepository } from './interfaces/youtube.interface';
import { YOUTUBE_REPOSITORY } from './youtube.constants';

describe('YoutubeService', () => {
  let service: YoutubeService;
  let repository: YoutubeRepository;

  beforeEach(async () => {
    const mockYoutubeRepository = {
      getHomeFeed: jest.fn().mockResolvedValue({}), // Mock implementation
      getInfo: jest.fn().mockResolvedValue({}), // Mock implementation
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: YOUTUBE_REPOSITORY,
          useValue: mockYoutubeRepository,
        },
        {
          provide: YoutubeService,
          useFactory: (repository: YoutubeRepository) => {
            return new YoutubeService(repository);
          },
          inject: [YOUTUBE_REPOSITORY],
        },
      ],
    }).compile();

    service = module.get<YoutubeService>(YoutubeService);
    repository = module.get<YoutubeRepository>(YOUTUBE_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getHomeFeed on the repository', async () => {
    await service.getHomeFeed();
    expect(repository.getHomeFeed).toHaveBeenCalled();
  });

  it('should call getTrack on the repository with correct parameters', async () => {
    const videoId = 'test-video-id';
    await service.getTrack(videoId);
    expect(repository.getInfo).toHaveBeenCalledWith(videoId, 'iOS');
  });
});

