import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsBoolean()
  isActive: boolean;
  @IsOptional()
  @IsUUID('4', { each: true })
  categoryId?: string;
  @IsOptional()
  @IsUUID('4', { each: true })
  taxFeeId?: string;
  @IsOptional()
  @IsUUID('4', { each: true })
  serviceFeeId?: string;
  @IsOptional()
  @IsUUID('4', { each: true })
  businessLocationId?: string;
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  order?: string[];
}
