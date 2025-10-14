import { IsEmail, IsEnum, IsMobilePhone, IsString, IsUrl } from "class-validator";
import { userStatus } from "../enum/user.enum";

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
}
