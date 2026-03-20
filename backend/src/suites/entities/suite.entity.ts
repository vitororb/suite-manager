import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SuiteCategories } from '../enum/suite-categories.enum';
import { SuiteStatus } from '../enum/suite-status.enum';

@Entity()
export class Suite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column({ enum: SuiteCategories })
  category: SuiteCategories;

  @Column({ enum: SuiteStatus })
  status: SuiteStatus;

  @Column()
  lastCheckout: string;

  @Column({ nullable: true })
  period: string;

  @Column({ nullable: true })
  alert: string;
}
