import { Controller, Sse, Post } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AccountService } from './account.service';
import { MessageEvent } from './dto/message-event.dto';
import { Account } from './interfaces/account.interface';

@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Sse('sse')
  public sse(): Observable<MessageEvent> {
    return this.service.onAccountUpdate().pipe(
      map((data: Account) => {
        console.log(data);
        return { data };
      }),
    );
  }

  @Post('sign-in')
  public async signIn(): Promise<void> {
    return this.service.signIn();
  }
}
