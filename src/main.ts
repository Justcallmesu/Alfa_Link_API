// External Modules
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

// Env Package
config({ path: '.env' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser(process.env.cookie_secret as string));

  await app.listen(3000);
}
bootstrap();
