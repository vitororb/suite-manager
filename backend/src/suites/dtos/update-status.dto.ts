import { IsEnum, IsNotEmpty } from 'class-validator';
import { SuiteStatus } from '../enum/suite-status.enum';

export class UpdateStatusDto {
  @IsEnum(SuiteStatus)
  @IsNotEmpty()
  status!: SuiteStatus;
}
