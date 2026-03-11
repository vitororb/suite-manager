import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SuiteStatus } from '../enum/suite-status.enum';
import { SuiteTypes } from '../enum/suite-types.enum';

@Entity()
export class Suite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  status: SuiteStatus;

  @Column()
  type: SuiteTypes;
}
