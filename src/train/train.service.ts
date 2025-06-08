import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { Pool } from 'pg';
import { C_Queries, T_Queries } from 'src/database/database.queries';

@Injectable()
export class TrainService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async create(createTrainDto: CreateTrainDto) {
    const { number, cars } = createTrainDto;
    try {
      const trainRes = await this.pool.query(T_Queries.insertTrain, [number]);
      const train = trainRes.rows[0];
      const values = cars.map((_, i) => `($1, $${i + 2})`).join(', ');

      await this.pool.query(C_Queries.insertCar + values, [train.id, ...cars]);

      return await this.findOne(number);
    } catch (error) {
      if (error.code === '23505')
        throw new BadRequestException('Потяг з таким номером існує');
    }
  }

  async findOne(id: string) {
    const train = (await this.pool.query(T_Queries.getTrainByNumber, [id]))
      .rows[0];
    if (!train) {
      throw new BadRequestException(`Поїзда з номером ${id} не існує`);
    }
    const carsResult = await this.pool.query(C_Queries.getCar, [train.id]);
    const cars = carsResult.rows.map((row) => row.number);

    return {
      id: train.id,
      number: train.number,
      cars,
    };
  }

  async updateCars(id: string, updateTrainDto: UpdateTrainDto) {
    const { cars } = updateTrainDto;
    const train = await this.findOne(id);
    const values = cars.map((_, i) => `($1, $${i + 2})`).join(', ');

    await this.pool.query(
      C_Queries.insertCar + values + C_Queries.removeConflict,
      [train.id, ...cars],
    );

    return await this.findOne(id);
  }

  async removeCars(id: string, updateTrainDto: UpdateTrainDto) {
    const newCars = updateTrainDto.cars;
    const train = await this.findOne(id);
    await this.pool.query(C_Queries.deleteCarByNumber, [train.id, newCars]);
    return await this.findOne(id);
  }
}
