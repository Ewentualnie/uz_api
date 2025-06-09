import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationModule } from './station/station.module';
import { DatabaseModule } from './database/database.module';
import { TrainModule } from './train/train.module';
import { TripsModule } from './trips/trips.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MyCacheInterceptor } from './interceptors/cache.interceptor';

@Module({
  imports: [
    StationModule,
    DatabaseModule,
    TrainModule,
    TripsModule,
    CacheModule.register({ ttl: 60, isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, MyCacheInterceptor],
})
export class AppModule {}
