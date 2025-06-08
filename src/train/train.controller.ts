import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TrainService } from './train.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Post()
  @ApiOperation({ summary: 'Створює поїзд' })
  create(@Body() createTrainDto: CreateTrainDto) {
    return this.trainService.create(createTrainDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Повертає потяг за його номером' })
  findOne(@Param('id') id: string) {
    return this.trainService.findOne(id);
  }

  @Post(':id/cars')
  @ApiOperation({ summary: 'Додає вагони до поїзда, повертає поїзд' })
  update(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainDto) {
    return this.trainService.updateCars(id, updateTrainDto);
  }

  @Patch(':id/cars')
  @ApiOperation({ summary: 'Видаляє вагони з поїзда, повертає поїзд' })
  remove(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainDto) {
    return this.trainService.removeCars(id, updateTrainDto);
  }
}
