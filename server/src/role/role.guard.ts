import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { RoleType } from './roles.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const classRoles =
      this.reflector.get<RoleType[]>(ROLES_KEY, context.getClass()) || [];
    const methodRoles =
      this.reflector.get<RoleType[]>(ROLES_KEY, context.getHandler()) || [];
    const requiredRoles = [...classRoles, ...methodRoles];
    if (!requiredRoles.length) return true;
    const userRoles = (req?.user?.roles || []) as RoleType[];
    console.log('required roles:', requiredRoles);
    console.log('user roles:', userRoles);
    return userRoles.some((role: RoleType) => requiredRoles.includes(role));
  }
}
