import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { Pool } from 'pg';
import { S_Queries } from 'src/database/database.queries';
import { Station } from './entities/station.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StationService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async create(createStationDto: CreateStationDto) {
    const { name, code } = createStationDto;
    if (!name || !code) {
      throw new BadRequestException('Назва або код станції не введено');
    }

    try {
      const result = await this.pool.query(S_Queries.insertStation, [
        name,
        code,
      ]);
      return plainToInstance(Station, result.rows[0]);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Така станція вже існує');
      }
      if (error.code === '23514') {
        throw new BadRequestException(
          'Код станції має бути семизначне число яке починається з 22',
        );
      }
      throw error;
    }
  }

  async findAll() {
    const result = await this.pool.query(S_Queries.getAllStations);
    return plainToInstance(Station, result.rows);
  }

  async findOne(code: number) {
    const result = await this.pool.query(S_Queries.getStationByCode, [code]);
    if (result.rows[0]) {
      return result.rows[0].name;
    } else {
      throw new BadRequestException(
        'Станції з таким кодом не існує, або ще не додана',
      );
    }
  }
}
