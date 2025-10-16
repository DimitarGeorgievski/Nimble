import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  users: string[];
}
