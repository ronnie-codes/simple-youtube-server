import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountRepository } from './interfaces/account.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ACCOUNT_REPOSITORY } from './account.constants';

describe('AccountService', () => {
  let service: AccountService;
  let repository: jest.Mocked<AccountRepository>;
  let mockCache: Cache;

  beforeEach(async () => {
    const mockAccountRepository: jest.Mocked<AccountRepository> = {
      signIn: jest.fn().mockResolvedValue(undefined),
      on: jest.fn(),
      once: jest.fn(),
    };

    // Create a simple mock for the cache
    mockCache = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      reset: jest.fn(),
    } as unknown as Cache;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: mockAccountRepository,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCache, // Provide the mock cache
        },
        {
          provide: AccountService,
          useFactory: (repository: AccountRepository, cache: Cache) => {
            return new AccountService(repository, cache);
          },
          inject: [ACCOUNT_REPOSITORY, CACHE_MANAGER], // Include CACHE_MANAGER in the injection tokens
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get<jest.Mocked<AccountRepository>>(ACCOUNT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call signIn', async () => {
    await service.signIn();
    expect(repository.signIn).toHaveBeenCalled();
  });
});
