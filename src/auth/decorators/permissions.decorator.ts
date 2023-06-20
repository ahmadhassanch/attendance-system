import { SetMetadata } from '@nestjs/common';
import {
  PermissionType,
  Resource,
} from 'src/roles-permissions/roles-permissions';

export type PermissionNeeded = `${Resource}.${PermissionType}`;

export function splitPermissionNeeded(
  permissionNeeded: PermissionNeeded,
): [Resource, PermissionType] {
  return permissionNeeded.split('.') as [Resource, PermissionType];
}

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: PermissionNeeded[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
