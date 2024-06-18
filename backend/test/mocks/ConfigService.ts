export const ConfigServiceMock = {
  get: jest.fn((key: string) => {
    if (key === 'JWT_ADMIN_EXPIRATION') return '1h';
    if (key === 'JWT_EXPIRATION') return '1h';
    if (key === 'JWT_REMEMBER_EXPIRATION') return '7d';
  }),
};