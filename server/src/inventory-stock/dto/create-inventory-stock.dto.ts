import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateInventoryStockDto {
  @IsString()
  itemName: string;
  @IsNumber()
  @Min(0)
  quantity: number;
  @IsString()
  unit: string;
  @IsNumber()
  @Min(0)
  minThreshold: number;
  @IsUUID('4')
  @IsOptional()
  businessLocationId?: string;
}
