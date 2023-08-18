import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskManagement',
  entities: [Product],
  synchronize: true,
};
