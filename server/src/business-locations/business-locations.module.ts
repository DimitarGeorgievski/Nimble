import { Module } from '@nestjs/common';
import { BusinessLocationsService } from './business-locations.service';
import { BusinessLocationsController } from './business-locations.controller';
import { BusinessLocation } from './entities/business-location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessLocation]), UsersModule],
  controllers: [BusinessLocationsController],
  providers: [BusinessLocationsService],
})
export class BusinessLocationsModule {}
