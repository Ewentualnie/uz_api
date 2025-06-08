import { Controller, Post, Body } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { FindTripDto } from './dto/find-trip.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @ApiOperation({ summary: 'Створює поїздку, повертає створену поїздку' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Post('/find')
  @ApiOperation({
    summary: 'Повертає список поїздок, що задовольняє вхідні параметри',
  })
  findAll(@Body() findTripDto: FindTripDto) {
    return this.tripsService.findAll(findTripDto);
  }
}
