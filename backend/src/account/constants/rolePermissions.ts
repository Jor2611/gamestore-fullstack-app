export enum AccessTypes {
  All = 'all',
  Self = 'self',
  None = 'none'
};

export enum Roles {
  Customer = 'customer',
  Admin = 'admin'
}

export interface Permission {
  resource: string;
  operation: string;
  access: AccessTypes ;
}

export const SYSTEM_ID = 1;

export type RolePermissions = Permission[];

export const rolePermissionMap = {
  customer: [
    { resource: 'account', operation: 'read', access: AccessTypes.Self },
    { resource: 'account', operation: 'create', access: AccessTypes.None },
    { resource: 'account', operation: 'update', access: AccessTypes.Self },
    { resource: 'account', operation: 'delete', access: AccessTypes.Self }
  ],
  admin: [
    { resource: 'account', operation: 'read', access: AccessTypes.All },
    { resource: 'account', operation: 'create', access: AccessTypes.None },
    { resource: 'account', operation: 'update', access: AccessTypes.All },
    { resource: 'account', operation: 'delete', access: AccessTypes.All }
  ]
}