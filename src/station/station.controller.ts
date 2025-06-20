import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StationResponse } from './dto/response-station.dto';

@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  @ApiOperation({ summary: 'Створити нову станцію' })
  @ApiResponse({ status: 201, type: StationResponse })
  @ApiResponse({ status: 400, description: 'Така станція вже існує' })
  @ApiResponse({ status: 400, description: 'Назва або код станції не введено' })
  @ApiResponse({
    status: 400,
    description: 'Код станції має бути семизначне число яке починається з 22',
  })
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationService.create(createStationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Повертає всі станції' })
  findAll() {
    return this.stationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Повертає назву станції' })
  @ApiResponse({ status: 201, description: 'Київ' })
  @ApiResponse({
    status: 400,
    description: 'Станції з таким кодом не існує, або ще не додана',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stationService.findOne(+id);
  }
}
