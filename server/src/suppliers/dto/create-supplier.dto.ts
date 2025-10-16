import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  address: string;
  @IsMobilePhone(undefined)
  phoneNumber: string;
}
