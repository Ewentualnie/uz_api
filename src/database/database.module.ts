import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { DBService } from './database.service';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_POOL',
      useFactory: async () => {
        const pool = new Pool({
          user: process.env.PGUSER || 'admin',
          host: process.env.PGHOST || 'localhost',
          database: process.env.PGDATABASE || 'railway',
          password: process.env.PGPASSWORD || 'root',
          port: 5432,
        });
        return pool;
      },
    },
    DBService,
  ],
  exports: ['PG_POOL'],
})
export class DatabaseModule {}
