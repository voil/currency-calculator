import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

/**
 * Function to start main class of NestJS
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(8000);
}

/*
|--------------------------------------------------------------------------
| Create boostrap app.
|--------------------------------------------------------------------------
|
| Initialize main function to start app.
|
*/
bootstrap();
