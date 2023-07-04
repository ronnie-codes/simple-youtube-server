import { ValidateNested, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';
import { AccountCredentialsDTO } from './account.credentials.dto';

export class AccountSignInDTO {
  @ValidateNested()
  @Type(() => AccountCredentialsDTO)
  @IsOptional()
  public credentials?: AccountCredentialsDTO;
}
