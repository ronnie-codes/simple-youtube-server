import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AccountRepository,
  Account,
  AccountCredentials,
} from './interfaces/account.interface';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class AccountService {
  constructor(private readonly repository: AccountRepository, private readonly cacheManager: Cache) {}

  public onAccountUpdate(): Observable<Account> {
    // TODO: Inject observable
    return new Observable((observer) => {
      console.log("onNewObservable");
      this.repository.once('auth-pending', (data) => {
        console.log('Sign in pending');
        observer.next({ status: 'pending', data });
      });
      this.repository.once('auth', async (account: Account) => {
        await this.cacheManager.set('credentials', account.credentials);
        console.log('Sign in successful');
        observer.next({ status: 'success' });
      });
      this.repository.once('auth-error', (error) => {
        console.error(error);
        observer.error(error);
      });
      this.repository.on('update-credentials', async (account: Account) => {
        await this.cacheManager.set('credentials', account.credentials);
        console.log('New credentials');
        observer.next({ status: 'success' });
      });
    });
  }

  public async signIn(): Promise<void> {
    const credentials = await this.cacheManager.get('credentials') as AccountCredentials;
    await this.repository.signIn(credentials);
  }
}
