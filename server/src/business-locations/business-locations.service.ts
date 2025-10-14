import { Injectable } from '@nestjs/common';
import { CreateBusinessLocationDto } from './dto/create-business-location.dto';
import { UpdateBusinessLocationDto } from './dto/update-business-location.dto';

@Injectable()
export class BusinessLocationsService {
  create(createBusinessLocationDto: CreateBusinessLocationDto) {
    return 'This action adds a new businessLocation';
  }

  findAll() {
    return `This action returns all businessLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessLocation`;
  }

  update(id: number, updateBusinessLocationDto: UpdateBusinessLocationDto) {
    return `This action updates a #${id} businessLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessLocation`;
  }
}
