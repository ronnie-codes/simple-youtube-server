import { Test, TestingModule } from '@nestjs/testing';
import { YtmusicService } from './ytmusic.service';
import { YtmusicRepository } from './interfaces/ytmusic.interface'; // Ensure this import is correct
import { YTMUSIC_REPOSITORY } from './ytmusic.constants';

describe('YtmusicService', () => {
  let service: YtmusicService;
  let repository: YtmusicRepository;

  beforeEach(async () => {
    const mockYtmusicRepository = {
      getHomeFeed: jest.fn().mockResolvedValue({}), // Mock implementation
      getInfo: jest.fn().mockResolvedValue({}), // Mock implementation
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: YTMUSIC_REPOSITORY,
          useValue: mockYtmusicRepository,
        },
        {
          provide: YtmusicService,
          useFactory: (repository: YtmusicRepository) => {
            return new YtmusicService(repository);
          },
          inject: [YTMUSIC_REPOSITORY],
        },
      ],
    }).compile();

    service = module.get<YtmusicService>(YtmusicService);
    repository = module.get<YtmusicRepository>(YTMUSIC_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getHomeFeed on the repository', async () => {
    await service.getHomeFeed();
    expect(repository.getHomeFeed).toHaveBeenCalled();
  });

  it('should call getInfo with correct parameters', async () => {
    const trackId = 'test-track-id';
    await service.getTrack(trackId);
    expect(repository.getInfo).toHaveBeenCalledWith(trackId, 'iOS');
  });
});
