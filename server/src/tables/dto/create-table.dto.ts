import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { status } from '../enums/table.enum';

export class CreateTableDto {
  @IsNumber()
  number: number;
  @IsString()
  zone: string;
  @IsEnum(status)
  status: status;
  @IsOptional()
  @IsUUID('4', { each: true })
  businessLocationId?: string;
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  order?: string[];
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  reservation?: string[];
}
