import { IsArray, IsOptional, IsString, IsUUID, isUUID } from 'class-validator';

export class CreateBusinessLocationDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsUUID('4')
  @IsOptional()
  business?: string;
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  tables?: string;
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  order?: string;
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  menuItem?: string;
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  inventoryStock?: string;
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  shift?: string;
}
