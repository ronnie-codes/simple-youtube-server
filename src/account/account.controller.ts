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
  public async signIn(@Body() signInDTO: AccountSignInDTO): Promise<void> {
    const credentials = signInDTO.credentials;

    if (credentials) {
      return this.service.signIn({
        access_token: credentials.access_token,
        refresh_token: credentials.refresh_token,
        expires: credentials.expires,
      });
    }
    return this.service.signIn();
  }
}
