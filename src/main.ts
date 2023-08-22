import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add the following CORS configuration
  app.enableCors({
    origin: '*',
    // origin: ['http://localhost:5173/', 'http://localhost:5174'], // Allow requests from this origin
    methods: 'GET, HEAD, PUT, PATCH, DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3333);
}

bootstrap();
