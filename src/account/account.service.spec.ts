import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import {
  AccountRepository,
  AccountCredentials,
} from './interfaces/account.interface';
import { ACCOUNT_REPOSITORY } from './account.constants';

describe('AccountService', () => {
  let service: AccountService;
  let repository: jest.Mocked<AccountRepository>;

  beforeEach(async () => {
    const mockAccountRepository: jest.Mocked<AccountRepository> = {
      signIn: jest.fn().mockResolvedValue(undefined),
      on: jest.fn(),
      once: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: mockAccountRepository,
        },
        {
          provide: AccountService,
          useFactory: (repository: AccountRepository) => {
            return new AccountService(repository);
          },
          inject: [ACCOUNT_REPOSITORY],
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get<jest.Mocked<AccountRepository>>(ACCOUNT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call signIn with stored credentials', async () => {
    const storedCredentials: AccountCredentials = {
      access_token: 'stored-access-token',
      refresh_token: 'stored-refresh-token',
      expires: new Date(),
    };
    service['accountCredentials'] = storedCredentials;

    await service.signIn();

    expect(repository.signIn).toHaveBeenCalledWith(storedCredentials);
  });
});