export enum AccountStatus {
  Active = 'active',
  Suspended = 'suspended',
  Pending = 'pending',
  Deleted = 'deleted'
}

export enum JWTEexpirations {
  REGULAR = 'JWT_EXPIRATION',
  ADMIN = 'JWT_ADMIN_EXPIRATION',
  REMEMBER_ME = 'JWT_REMEMBER_EXPIRATION'
};