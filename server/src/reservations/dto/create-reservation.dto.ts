import {
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { reservationStatus } from '../enums/reservation.enum';

export class CreateReservationDto {
  @IsString()
  customerName: string;
  @IsString()
  customerPhone: string;
  @IsISO8601()
  reservationTime: Date;
  @IsNumber()
  guestCount: number;
  @IsEnum(reservationStatus)
  status: reservationStatus;
  @IsUUID('4')
  @IsOptional()
  tableId: string;
}
