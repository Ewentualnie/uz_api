import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TrainService } from './train.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';

@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Post()
  create(@Body() createTrainDto: CreateTrainDto) {
    return this.trainService.create(createTrainDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainService.findOne(id);
  }

  @Post(':id/cars')
  update(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainDto) {
    return this.trainService.updateCars(id, updateTrainDto);
  }

  @Patch(':id/cars')
  remove(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainDto) {
    return this.trainService.removeCars(id, updateTrainDto);
  }
}
