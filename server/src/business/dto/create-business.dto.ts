import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsUUID("4")
  @IsOptional()
  taxId?: string;
  @IsUUID("4")
  @IsOptional()
  serviceFeeId?: string;
  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  businessAddress?: string[];
  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  categories?: string[];
}
