import { Roles } from "../src/account/constants/rolePermissions";

export const mockAccount = {
  id: 1,
  fakeId: 123456789, 
  email:'test@test.com',
  updatedEmail: 'updated@test.com', 
  wrongEmail: 'wrong@mail.com',
  password: 'asd123', 
  wrongPassword: 'wrong123',
  updatedPassword: 'updated123',
  role: Roles.Customer,
  token: 'thisistoken'
};

// Mock JwtService
export const mockJwtService = {
  signAsync: jest.fn().mockImplementation(() => {
    return 'thisismocktoken!';
  }),
};

// Mock ConfigService
export const mockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'JWT_ADMIN_EXPIRATION') return '1h';
    if (key === 'JWT_EXPIRATION') return '1h';
    if (key === 'JWT_REMEMBER_EXPIRATION') return '7d';
  }),
};

export const JWTExpirationMap = {
  'JWT_EXPIRATION': '1h',
  'JWT_ADMIN_EXPIRATION': '1h',
  'JWT_REMEMBER_EXPIRATION': '7d'
};
