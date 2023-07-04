import {
  IsString,
  IsDateString,
  ValidateNested,
  IsOptional,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CredentialsDTO {
  @IsString()
  access_token: string;

  @IsString()
  refresh_token: string;

  @IsDateString()
  expires: Date;
}

export class SignInDTO {
  @ValidateNested()
  @Type(() => CredentialsDTO)
  @IsOptional()
  credentials?: CredentialsDTO;
}
