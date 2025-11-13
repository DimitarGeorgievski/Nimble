import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class StaffService {
  constructor(@InjectRepository(Staff) private staffRepo: Repository<Staff>) {}
  async create(data: CreateStaffDto) {
    try {
      const foundStaff = await this.findOneByName(data.firstName);
      if (foundStaff)
        throw new BadRequestException('Staff with this name already exists');
      const newStaff = await this.staffRepo.save({
        ...data,
      });
      return newStaff;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Staff with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll(filter?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    status?: string;
    location?: string;
  }) {
    const builder = this.staffRepo
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.businessLocationId', 'location');

    if (filter?.firstName)
      builder.andWhere('staff.firstName ILIKE :firstName', {
        firstName: `%${filter.firstName}%`,
      });
    if (filter?.lastName)
      builder.andWhere('staff.lastName ILIKE :lastName', {
        lastName: `%${filter.lastName}%`,
      });
    if (filter?.email)
      builder.andWhere('staff.email ILIKE :email', {
        email: `%${filter.email}%`,
      });
    if (filter?.status)
      builder.andWhere('staff.status = :status', { status: filter.status });
    if (filter?.location)
      builder.andWhere('location.id = :locationId', {
        locationId: filter.location,
      });
    return builder.getMany();
  }

  async findOneByName(name: string) {
    return await this.staffRepo.findOne({
      where: { firstName: ILike(`%${name}%`) },
    });
  }

  async findOne(id: string) {
    try {
      const foundStaff = await this.staffRepo.findOneBy({ id });
      return foundStaff;
    } catch (error) {
      throw new NotFoundException('Staff not found');
    }
  }

  async update(id: string, data: UpdateStaffDto) {
    try {
      const foundStaff = await this.staffRepo.findOne({
        where: { id },
      });
      if (!foundStaff) throw new NotFoundException('Staff not found');
      Object.assign(foundStaff, { ...data });
      await this.staffRepo.save(foundStaff);
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException('Got Issue with updating this Staff');

      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundStaff = await this.findOne(id);
    if (!foundStaff) throw new NotFoundException('Staff not Found');
    return this.staffRepo.remove(foundStaff);
  }
}
