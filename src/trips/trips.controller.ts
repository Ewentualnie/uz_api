import { Controller, Post, Body } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { FindTripDto } from './dto/find-trip.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Post('/find')
  findAll(@Body() findTripDto: FindTripDto) {
    return this.tripsService.findAll(findTripDto);
  }
}
