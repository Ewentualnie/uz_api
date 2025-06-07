import { Inject, Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { Pool } from 'pg';

@Injectable()
export class StationService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async create(dto: CreateStationDto) {
    const { name, code } = dto;
    const query = `
      INSERT INTO stations (name, code)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await this.pool.query(query, [name, code]);
    return result.rows[0];
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM stations');
    return result.rows;
  }

  async findOne(code: number) {
    const result = await this.pool.query(
      'SELECT * FROM stations WHERE code = $1',
      [code],
    );
    return result.rows[0];
  }
}
