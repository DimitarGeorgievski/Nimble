import { Module } from '@nestjs/common';
import { ServiceFeeService } from './service-fee.service';
import { ServiceFeeController } from './service-fee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceFee } from './entities/service-fee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceFee])],
  controllers: [ServiceFeeController],
  providers: [ServiceFeeService],
})
export class ServiceFeeModule {}
