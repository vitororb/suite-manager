import { MaxLength } from 'class-validator';

export class UpdateAlertDto {
  @MaxLength(50)
  alert!: string;
}
