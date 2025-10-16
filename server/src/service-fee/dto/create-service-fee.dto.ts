import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { serviceFeeType } from '../enums/service-fee.enum';

export class CreateServiceFeeDto {
  @IsString()
  name: string;
  @IsEnum(serviceFeeType)
  type: serviceFeeType;
  @IsOptional()
  @IsNumber()
  percent?: number;
  @IsOptional()
  @IsNumber()
  fixedAmount?: number;
  @IsBoolean()
  isDefault: boolean;
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  menuCategory?: string[];
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  buisness?: string[];
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  orderItem?: string[];
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  menuItem?: string[];
}
