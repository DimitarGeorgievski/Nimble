import { IsUUID, IsOptional, IsNumber, IsString } from "class-validator";

export class CreateOrderItemDto {
  @IsNumber()
  quantity: number;
  @IsString()
  customNotes: string;
  @IsUUID('4')
  @IsOptional()
  orderId?: string;
  @IsUUID('4')
  @IsOptional()
  menuItemId?: string;
  @IsUUID('4')
  @IsOptional()
  taxId?: string;
  @IsUUID('4')
  @IsOptional()
  serviceFeeId?: string;
}
