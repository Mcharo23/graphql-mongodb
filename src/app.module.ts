import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';
import { SalesModule } from './sales/sales.module';
import { Sale } from './sales/entities/sale.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb://localhost/school',
    //   synchronize: true,
    //   useUnifiedTopology: true,
    //   entities: [Lesson, Student],
    // }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/products',
      synchronize: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      entities: [Lesson, Student, Product, User, Sale],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    LessonModule,
    StudentModule,
    ProductsModule,
    AuthModule,
    SalesModule,
  ],
})
export class AppModule {}
