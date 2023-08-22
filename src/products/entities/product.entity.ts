import { User } from 'src/auth/entities/auth.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  description: string;

  @Column()
  productInStock: number;

  @Column()
  productUrl: string[];

  @ManyToMany(() => User, (user) => user.products)
  user: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
