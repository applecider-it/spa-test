import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

export const DrizzleProvider: Provider = {
  provide: 'DRIZZLE',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const databaseUrl = configService.get<string>('database.url');

    const pool = new Pool({
      connectionString: databaseUrl,
    });

    return drizzle(pool, {
      logger: true,
    });
  },
};
