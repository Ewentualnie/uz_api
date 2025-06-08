import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TrainModule } from 'src/train/train.module';
import { StationModule } from 'src/station/station.module';

@Module({
  imports: [TrainModule, StationModule],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
