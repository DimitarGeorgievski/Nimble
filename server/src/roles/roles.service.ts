import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ILike, Repository } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}
  async create(data: CreateRoleDto) {
    try {
      const foundRole = await this.findRoleByName(data.name);
      if (foundRole)
        throw new BadRequestException('Role with this name already exists');
      const newRole = await this.roleRepo.save({
        ...data,
        users: data.users?.map((id) => ({ id })),
      });
      return newRole;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Role with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.roleRepo.find({});
  }
  async findRoleByName(name: string) {
    return this.roleRepo.findOne({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async findOne(id: string) {
    try {
      const foundRole = await this.roleRepo.findOneByOrFail({ id });
      return foundRole;
    } catch (error) {
      throw new NotFoundException('Role not found');
    }
  }

  async update(id: string, data: UpdateRoleDto) {
    try {
      const foundRole = this.findOne(id);
      Object.assign(foundRole, data);
      await this.roleRepo.save({
        ...data,
        users: data.users?.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Got Issue with updating this Role',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundRole = await this.findOne(id);
    if (!foundRole) throw new NotFoundException('Role not Found');
    return this.roleRepo.remove(foundRole);
  }
}
