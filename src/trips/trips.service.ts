import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { Pool } from 'pg';
import { TrainService } from 'src/train/train.service';
import { StationService } from 'src/station/station.service';
import { Trip_Queries } from 'src/database/database.queries';
import { FindTripDto } from './dto/find-trip.dto';
import { FindOneTripDto } from './dto/trip.dto';

@Injectable()
export class TripsService {
  constructor(
    @Inject('PG_POOL') private pool: Pool,
    @Inject() private trainService: TrainService,
    @Inject() private stationService: StationService,
  ) {}

  async create(dto: CreateTripDto) {
    const departureDate = new Date(dto.departureDate);
    const arrivalDate = new Date(dto.arrivalDate);
    const fromStation = await this.stationService.findByName(dto.departureSt);
    const toStation = await this.stationService.findByName(dto.arrivalSt);
    const train = await this.trainService.findOne(dto.train);

    if (departureDate > arrivalDate) {
      throw new BadRequestException(
        'Дата відправки має бути раніше дати прибуття',
      );
    }
    if (fromStation.id == toStation.id) {
      throw new BadRequestException(
        'Станція відправлення і станція прибуття мають відрізнятись',
      );
    }

    const result = await this.pool.query(Trip_Queries.insertTrip, [
      train.id,
      fromStation.id,
      toStation.id,
      departureDate,
      arrivalDate,
    ]);

    return this.findTrip(result.rows[0]);
  }

  async findAll(dto: FindTripDto) {
    const fromStation = await this.stationService.findByName(dto.departureSt);
    const toStation = await this.stationService.findByName(dto.arrivalSt);
    if (fromStation.id == toStation.id) {
      throw new BadRequestException(
        'Станція відправлення і станція прибуття мають відрізнятись',
      );
    }
    const result = await this.pool.query(Trip_Queries.getTrip, [
      fromStation.id,
      toStation.id,
    ]);

    return this.findTrip(result.rows);
  }

  async findTrip(input: FindOneTripDto | FindOneTripDto[]) {
    const dtos = Array.isArray(input) ? input : [input];

    const results = await Promise.all(
      dtos.map(async (dto) => {
        const train = await this.trainService.findById(dto.train_id);
        const departureStation = await this.stationService.findById(
          dto.departure_station_id,
        );
        const arrivalStation = await this.stationService.findById(
          dto.arrival_station_id,
        );

        return {
          train,
          fromStation: departureStation,
          toStation: arrivalStation,
          departureTime: dto.departure_time,
          arrivalTime: dto.arrival_time,
        };
      }),
    );

    return Array.isArray(input) ? results : results[0];
  }
}
