import { Controller, Sse, Post, Body } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AccountService } from './account.service';
import { AccountSignInDTO } from './dto/account.sign-in.dto';
import { MessageEvent } from './dto/message-event.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Sse('sse')
  public sse(): Observable<MessageEvent> {
    return this.service.onAccountUpdate().pipe(
      map((data) => {
        return { data };
      }),
    );
  }

  @Post('sign-in')
  public async signIn(): Promise<void> {
    // TODO: If necessary, check for existing session and block.
    return this.service.signIn();
  }
}
