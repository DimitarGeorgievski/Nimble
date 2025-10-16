import { IsEnum, IsISO8601, IsOptional, IsUUID } from 'class-validator';
import { roleShifts } from '../enums/shifts.enum';

export class CreateShiftDto {
  @IsISO8601()
  startTime: Date;
  @IsISO8601()
  endTime: Date;
  @IsEnum(roleShifts)
  role: roleShifts;
  @IsUUID('4')
  @IsOptional()
  businessLocationId?: string;
  @IsUUID('4')
  @IsOptional()
  userId?: string;
}
