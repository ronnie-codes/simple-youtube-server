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
        console.debug('Sign in pending');
        observer.next({ status: 'pending', data });
      });
      this.repository.once('auth', ({ credentials }) => {
        console.debug(`Sign in successful`);
        observer.next({ status: 'success', credentials });
      });
      this.repository.once('auth-error', (error) => {
        console.error(error);
        observer.error(error);
      });
      this.repository.on('update-credentials', ({ credentials }) => {
        console.debug(`New credentials`);
        observer.next({ status: 'success', credentials });
      });
    });
  }

  public async signIn(credentails?: AccountCredentials): Promise<void> {
    await this.repository.signIn(credentails);
  }
}
