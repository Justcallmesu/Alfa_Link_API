import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Module
import { SeedModule } from './database/seeders/seed.module';
import { UserSeed } from './database/seeders/user.seed';

// Env Package
config({ path: '.env' });

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.createApplicationContext(SeedModule);

  logger.log('Seeding Started');
  await (await app.resolve(UserSeed)).seed();

  await app.close();
}

bootstrap();
