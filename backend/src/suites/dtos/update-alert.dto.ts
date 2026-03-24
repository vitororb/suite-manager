import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateAlertDto {
  @IsNotEmpty()
  @MaxLength(50)
  alert: string;
}
