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
import { ProductType } from '../../product-types/entities/product-type.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  code!: string;

  @Column({ type: 'varchar', length: 150 })
  productName!: string;

  @Column({ type: 'varchar', length: 100 })
  brand!: string;

  @ManyToOne(() => ProductType, (type) => type.name)
  @JoinColumn({ name: 'type_id' })
  productType!: ProductType;

  @Column({ type: 'int', default: 0 })
  quantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costPrice!: number;

  @Column({ type: 'varchar', length: 50 })
  unitType!: string;

  @Column({ type: 'int', default: 0 })
  minimumStock!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
