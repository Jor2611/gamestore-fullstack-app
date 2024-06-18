export const JWTExpirationMap = {
  'JWT_EXPIRATION': '1h',
  'JWT_ADMIN_EXPIRATION': '1h',
  'JWT_REMEMBER_EXPIRATION': '7d'
};

export const JwtServiceMock = {
  signAsync: jest.fn().mockImplementation(() => {
    return 'thisismocktoken!';
  }),
};
