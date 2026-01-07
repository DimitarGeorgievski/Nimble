import { IsEnum, IsString, Length } from "class-validator";
import { userStatus } from "src/users/enum/user.enum";
import { staffGender } from "../enums/staff.enum";

export class CreateStaffDto {
  @IsString()
  firstName: string;
  @IsString()
  @Length(0,50)
  lastName: string;
  @IsString()
  @Length(0,50)
  email: string;
  @IsString()
  @Length(0,17)
  phoneNumber: string;
  @IsEnum(userStatus)
  status?: userStatus;
  @IsString()
  @Length(0,30)
  color: string;
  @IsEnum(staffGender)
  gender: staffGender;
}
