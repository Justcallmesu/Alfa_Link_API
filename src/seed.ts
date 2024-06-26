import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Module
import { SeedModule } from './database/seed.module';
import { UserSeed } from './database/seeders/user.seed';
import { PermissionsSeed } from './database/seeders/permissions.seed';
import { RolesSeed } from './database/seeders/roles.seed';

// Env Package
config({ path: '.env' });

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule, {
    logger: false,
  });

  app.useLogger(new Logger());

  logger.log('Seeding Started');
  await (await app.resolve(PermissionsSeed)).seed();
  await (await app.resolve(RolesSeed)).seed();
  await (await app.resolve(UserSeed)).seed();

  logger.log('Seeding Completed');
  await app.close();
}
logger.warn('Seeding will delete all data in the database');
logger.warn('Press Ctrl + C to cancel the operation');

setTimeout(() => {
  bootstrap();
}, 5000);
