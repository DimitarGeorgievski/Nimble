import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMenuCategoryDto {
  @IsString()
  name: string;
  @IsUUID('4')
  @IsOptional()
  taxId?: string;
  @IsUUID('4')
  @IsOptional()
  serviceFeeId?: string;
  @IsUUID('4')
  @IsOptional()
  businessId?: string;
  @IsUUID('4')
  @IsArray()
  @IsOptional()
  menuItem?: string[];
}
