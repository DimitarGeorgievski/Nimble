import { Injectable } from '@nestjs/common';
import { CreateServiceFeeDto } from './dto/create-service-fee.dto';
import { UpdateServiceFeeDto } from './dto/update-service-fee.dto';

@Injectable()
export class ServiceFeeService {
  create(createServiceFeeDto: CreateServiceFeeDto) {
    return 'This action adds a new serviceFee';
  }

  findAll() {
    return `This action returns all serviceFee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceFee`;
  }

  update(id: number, updateServiceFeeDto: UpdateServiceFeeDto) {
    return `This action updates a #${id} serviceFee`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceFee`;
  }
}
