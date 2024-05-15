import { LoadStrategy } from '@mikro-orm/core';
import { defineConfig } from '@mikro-orm/mysql';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Recipe } from '../entities/recipe.model';
import { Ingredient } from '../entities/ingredient.model';
import { Migrator } from '@mikro-orm/migrations';
import { Migration1715788103153 } from './migrations/Migration1715788103153';
export const mikroOrmConfigFactory = (configService: ConfigService) => {
  const dbLogger = new Logger('MikroORM');
  const config = defineConfig({
    entities: [Recipe, Ingredient],
    host: configService.get('DB_HOST'),
    dbName: configService.get('DB_NAME'),
    user: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    port: configService.get('DB_PORT'),
    debug: false, // configService.get('NODE_ENV') !== 'production',
    metadataCache: {
      enabled: false,
    },
    timezone: configService.get('DB_TIMEZONE'),
    logger: dbLogger.log.bind(dbLogger),
    migrations: {
      dropTables: true,
      allOrNothing: true,
      migrationsList: [Migration1715788103153].map((m) => ({
        class: m,
        name: m.name,
      })),
    },
    loadStrategy: LoadStrategy.JOINED,
    extensions: [Migrator],
  });

  console.log(config);

  return config;
};
