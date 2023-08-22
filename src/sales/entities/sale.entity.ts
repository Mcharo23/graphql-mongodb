import { User } from 'src/auth/entities/auth.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Sale extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  quantity: number;

  @Column()
  totalAmount: number;

  @CreateDateColumn()
  purchaseDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
