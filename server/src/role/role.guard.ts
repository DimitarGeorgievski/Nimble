import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './role.decorator';
import { RoleType } from './roles.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const [classRole, handlerRole] = this.reflector.getAll(Roles, [
      context.getClass(),
      context.getHandler(),
    ]);
    const decoratorRole = handlerRole || classRole;
    if (!decoratorRole) return true;
    const userRole = req.user.role as RoleType;
    if (userRole !== decoratorRole) return false;
    return true;
  }
}
