import { Module, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './interfaces/account.interface';
import { ACCOUNT_REPOSITORY } from './account.constants';

@Module({
  controllers: [AccountController],
  providers: [
    {
      provide: AccountService,
      useFactory: (repository: AccountRepository, cache: Cache) => {
        return new AccountService(repository, cache);
      },
      inject: [ACCOUNT_REPOSITORY, CACHE_MANAGER],
    },
  ],
})
export class AccountModule {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private readonly repository: AccountRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}
}
