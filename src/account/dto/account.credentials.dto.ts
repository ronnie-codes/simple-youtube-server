import { IsString, IsDateString } from 'class-validator';

export class AccountCredentialsDTO {
  @IsString()
  public access_token: string;

  @IsString()
  public refresh_token: string;

  @IsDateString()
  public expires: Date;
}
