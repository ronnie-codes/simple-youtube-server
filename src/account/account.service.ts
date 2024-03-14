import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AccountRepository,
  Account,
  AccountCredentials,
} from './interfaces/account.interface';

@Injectable()
export class AccountService {
  constructor(private readonly repository: AccountRepository) {}

  public onAccountUpdate(): Observable<Account> {
    // TODO: Inject observable
    return new Observable((observer) => {
      this.repository.once('auth-pending', (data) => {
        console.log('Sign in pending');
        observer.next({ status: 'pending', data });
      });
      this.repository.once('auth', () => {
        console.log('Sign in successful');
        observer.next({ status: 'success' });
      });
      this.repository.once('auth-error', (error) => {
        console.error(error);
        observer.error(error);
      });
      this.repository.on('update-credentials', () => {
        console.log('New credentials');
        observer.next({ status: 'success' });
      });
    });
  }

  public async signIn(): Promise<void> {
    await this.repository.signIn();
  }
}
