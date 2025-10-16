import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { userStatus } from '../enum/user.enum';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsMobilePhone(undefined)
  phoneNumber: string;
  @IsString()
  password: string;
  @IsEnum(userStatus)
  status: userStatus;
  @IsUrl()
  profileImageUrl: string;
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  roles?: string[];
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  order?: string[];
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  shift?: string[];
}
