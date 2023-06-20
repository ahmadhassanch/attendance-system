import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import {
  PERMISSIONS_KEY,
  PermissionNeeded,
  splitPermissionNeeded,
  IS_PUBLIC_KEY,
} from '../decorators';

import { Profile } from '../dto';
import { RolesPermissions } from 'src/roles-permissions/roles-permissions';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const requiredPermissions = this.reflector
      .getAllAndOverride<PermissionNeeded[]>(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
      ?.map(splitPermissionNeeded);

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const profile: Profile = user.profile;

    return requiredPermissions.every(([resource, permission]) => {
      const role = profile.roles[0].role;

      const rolePermissions = RolesPermissions[role];

      if (rolePermissions[resource] && rolePermissions[resource][permission]) {
        return true;
      } else {
        return false;
      }
    });
  }
}
