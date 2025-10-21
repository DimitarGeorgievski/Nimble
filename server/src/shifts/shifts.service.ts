import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { Repository, ILike } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class ShiftsService {
  constructor(@InjectRepository(Shift) private shiftRepo: Repository<Shift>) {}
  async create(data: CreateShiftDto) {
    try {
      const foundShift = await this.findOneByName(data.name);
      if (foundShift)
        throw new BadRequestException('Shift with this name already exists');
      const newShift = await this.shiftRepo.save({
        ...data,
        businessLocationId: data.businessLocationId
          ? { id: data.businessLocationId }
          : undefined,
        userId: data.userId ? { id: data.userId } : undefined,
      });
      return newShift;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Shift with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.shiftRepo.find({
      relations: {
        businessLocationId: true,
        userId: true,
      },
    });
  }

  async findOneByName(name: string) {
    return this.shiftRepo.findOne({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async findOne(id: string) {
    try {
      const foundShift = await this.shiftRepo.find({
        where: { id },
        relations: {
          businessLocationId: true,
          userId: true,
        },
      });
      return foundShift;
    } catch (error) {
      throw new NotFoundException('Shift not found');
    }
  }

  async update(id: string, data: UpdateShiftDto) {
    try {
      const foundShift = await this.shiftRepo.findOne({
        where: { id },
        relations: ['userId', 'businessLocationId'],
      });
      if (!foundShift) throw new NotFoundException('Table not found');
      Object.assign(foundShift, {
        ...data,
        id,
        businessLocationId: data.businessLocationId
          ? { id: data.businessLocationId }
          : undefined,
        userId: data.userId ? { id: data.userId } : undefined,
      });
      await this.shiftRepo.save(foundShift);
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException('Got Issue with updating this shift');

      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundShift = await this.findOne(id);
    if (!foundShift) throw new NotFoundException('Shift not Found');
    return this.shiftRepo.remove(foundShift);
  }
}
