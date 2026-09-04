import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SuiteCategory } from '../../suite-categories/entities/suite-category.entity';
import { SuiteStatus } from '../enums/suite-status.enum';

@Entity()
export class Suite {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', unique: true })
  number!: number;

  @ManyToOne(() => SuiteCategory, (category) => category.name)
  @JoinColumn({ name: 'category_id' })
  category!: SuiteCategory;

  @Column({ enum: SuiteStatus, default: SuiteStatus.LIVRE })
  status!: SuiteStatus;

  @Column({ nullable: true, type: 'timestamp', default: null })
  checkIn!: Date | null;

  @Column({ nullable: true, type: 'timestamp', default: null })
  checkOut!: Date | null;

  @Column({ nullable: true, default: '' })
  alert!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
