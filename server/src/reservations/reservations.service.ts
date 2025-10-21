import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ILike, Repository } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class ReservationsService {
  constructor(@InjectRepository(Reservation) private reservationRepo: Repository<Reservation>){}
  async create(data: CreateReservationDto) {
      try {
        const foundReservation = await this.findOneByName(data.customerName);
        if (foundReservation)
          throw new BadRequestException('Reservation with this customer Name already exists');
        const newShift = await this.reservationRepo.save({
          ...data,
          tableId: data.tableId
            ? { id: data.tableId }
            : undefined,
        });
        return newShift;
      } catch (error) {
        if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
          throw new BadRequestException(
            'Reservation with these informations already exist',
          );
        throw new InternalServerErrorException(error.messsage);
      }
    }
  
    async findAll() {
      return await this.reservationRepo.find({
        relations: {
          tableId: true,
        },
      });
    }
  
    async findOneByName(name: string) {
      return this.reservationRepo.findOne({
        where: { customerName: ILike(`%${name}%`) },
      });
    }
  
    async findOne(id: string) {
      try {
        const foundReservation = await this.reservationRepo.find({
          where: { id },
          relations: {
            tableId: true,
          },
        });
        return foundReservation;
      } catch (error) {
        throw new NotFoundException('Reservation not found');
      }
    }
  
    async update(id: string, data: UpdateReservationDto) {
      try {
        const foundReservation = await this.reservationRepo.findOne({
          where: { id },
          relations: ['tableId'],
        });
        if (!foundReservation) throw new NotFoundException('Reservation not found');
        Object.assign(foundReservation, {
          ...data,
          tableId: data.tableId
            ? { id: data.tableId }
            : undefined,
        });
        await this.reservationRepo.save(foundReservation);
      } catch (error) {
        if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
          throw new BadRequestException('Got Issue with updating this Reservation');
  
        throw new InternalServerErrorException(error.messsage);
      }
    }
  
    async remove(id: string) {
      const foundReservation = await this.findOne(id);
      if (!foundReservation) throw new NotFoundException('Reservation not Found');
      return this.reservationRepo.remove(foundReservation);
    }
}
