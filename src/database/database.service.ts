import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import {
  C_Queries,
  S_Queries,
  T_Queries,
  Trip_Queries,
} from './database.queries';

@Injectable()
export class DBService implements OnModuleInit {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async onModuleInit() {
    await this.createTablesIfNotExist();
  }

  private async createTablesIfNotExist() {
    await this.pool.query(S_Queries.createTable);
    await this.pool.query(T_Queries.createTable);
    await this.pool.query(C_Queries.createTable);
    await this.pool.query(Trip_Queries.createTable);
  }
}
