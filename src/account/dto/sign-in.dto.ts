import {
  IsString,
  IsDateString,
  ValidateNested,
  IsOptional,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CredentialsDTO {
  @IsString()
  public access_token: string;

  @IsString()
  public refresh_token: string;

  @IsDateString()
  public expires: Date;
}

export class SignInDTO {
  @ValidateNested()
  @Type(() => CredentialsDTO)
  @IsOptional()
  public credentials?: CredentialsDTO;
}
