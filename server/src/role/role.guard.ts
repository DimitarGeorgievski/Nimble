import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { RoleType } from './roles.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );
    if (!requiredRoles) return true;
    const userRole = (req?.user?.roles || []) as RoleType[];
    return userRole.some((role: RoleType) => requiredRoles.includes(role));
  }
}
