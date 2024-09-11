import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';
import { Account } from './interfaces/account.interface';

describe('AccountController', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const mockAccountService = {
      signIn: jest.fn().mockResolvedValue(undefined), // Mock implementation for signIn
      onAccountUpdate: jest.fn().mockReturnValue(new Observable<Account>()), // Mock implementation for onAccountUpdate
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: mockAccountService,
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
