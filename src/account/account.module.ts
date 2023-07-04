import { Module, Inject } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './interfaces/account.interface';
import { ACCOUNT_REPOSITORY } from './account.constants';

@Module({
  controllers: [AccountController],
  providers: [
    {
      provide: AccountService,
      useFactory: (repository: AccountRepository) => {
        return new AccountService(repository);
      },
      inject: [ACCOUNT_REPOSITORY],
    },
  ],
})
export class AccountModule {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private readonly repository: AccountRepository,
  ) {}
}
