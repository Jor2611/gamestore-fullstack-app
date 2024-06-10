import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { scrypt as _scrypt } from 'crypto';
import { EntityManager, EntityTarget, FindOptionsWhere, Repository } from 'typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { Roles } from './constants/rolePermissions';
import { JWTExpirationMap, mockAccount, mockConfigService, mockJwtService } from '../../test/mocks';
import { AccountStatus, JWTEexpirations } from './constants/enums';

let accounts: Account[] = [];
const { email, wrongEmail, password, wrongPassword } = mockAccount;

describe('AccountService', () => {
  let service: AccountService;
  let jwtService: JwtService;
  let repository: Repository<Account>;
  let configService: ConfigService;

  const mockedManager: Partial<EntityManager> = {
    create: jest.fn().mockImplementation((entityClass: EntityTarget<Account>, data: Object): Account => { 
      return { id: Math.floor(Math.random() * 10000), status: AccountStatus.Active, ...data } as Account;
    }),
    save: jest.fn().mockImplementation((entityClass: EntityTarget<Account>, data: Account): Promise<Account> => {
      return new Promise((resolve, reject) => {
        accounts.push(data);
        resolve(data);
      });
    }),
    findOneBy: jest.fn().mockImplementation((entityClass: EntityTarget<Account>, where: FindOptionsWhere<Account>): Promise<Account> => {
      return new Promise((resolve, reject) => {
        const [[key,value]]= Object.entries(where);
        const account = accounts.find(account => account[key] === value);
        resolve(account);
      })
    }),
    query: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useValue: {
            manager: {
              transaction: jest.fn((cb) => cb(mockedManager))
            },
            findOne: (filter: { where: FindOptionsWhere<Account> }): Promise<Account> => {
              return new Promise((resolve, reject) => {
                const [[key,value]]= Object.entries(filter.where);
                const account = accounts.find(account => account[key] === value);
                resolve(account);
              });
            },
            create: () => {},
            save: () => {},
          }
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        },
        {
          provide: ConfigService,
          useValue: mockConfigService
        }
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get<Repository<Account>>(getRepositoryToken(Account));
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(()=> {
    accounts = [];
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('should create and save a Customer account successfully', async () => {
    const spyOnTransaction = jest.spyOn(repository.manager, 'transaction');
    const spyOnEntityManagerQuery = jest.spyOn(mockedManager, 'query');
    const spyOnEntityManagerFindOneBy = jest.spyOn(mockedManager, 'findOneBy');
    const spyOnEntityManagerCreate = jest.spyOn(mockedManager, 'create');
    const spyOnEntityManagerSave = jest.spyOn(mockedManager, 'save');

    const customer = await service.signUp({ email, password }, Roles.Customer);

    expect(customer).toBeDefined();
    expect(customer.role).toEqual(Roles.Customer);
    expect(spyOnTransaction).toHaveBeenCalled();
    expect(spyOnEntityManagerQuery).toHaveBeenCalled();
    expect(spyOnEntityManagerFindOneBy).toHaveBeenCalledWith(Account, { email });
    expect(spyOnEntityManagerCreate).toHaveBeenCalledWith(Account, { email, password: customer.password, status: AccountStatus.Active, role: Roles.Customer });
    expect(spyOnEntityManagerSave).toHaveBeenCalledWith(Account, customer);
    expect(accounts).toHaveLength(1);
  });

  it('should create and save a Admin account successfully', async () => {
    const spyOnTransaction = jest.spyOn(repository.manager, 'transaction');
    const spyOnEntityManagerQuery = jest.spyOn(mockedManager, 'query');
    const spyOnEntityManagerFindOneBy = jest.spyOn(mockedManager, 'findOneBy');
    const spyOnEntityManagerCreate = jest.spyOn(mockedManager, 'create');
    const spyOnEntityManagerSave = jest.spyOn(mockedManager, 'save');

    const admin = await service.signUp({ email, password }, Roles.Admin);

    expect(admin).toBeDefined();
    expect(admin.role).toEqual(Roles.Admin);
    expect(spyOnTransaction).toHaveBeenCalled();
    expect(spyOnEntityManagerQuery).toHaveBeenCalled();
    expect(spyOnEntityManagerFindOneBy).toHaveBeenCalledWith(Account, { email });
    expect(spyOnEntityManagerCreate).toHaveBeenCalledWith(Account, { email, password: admin.password, status: AccountStatus.Active, role: Roles.Admin });
    expect(spyOnEntityManagerSave).toHaveBeenCalledWith(Account, admin);
    expect(accounts).toHaveLength(1);
  });

  it('should create a new account with encrypted password', async () => {
    const customer = await service.signUp({ email, password }, Roles.Customer);
    const [salt,hash] = customer.password.split('.');

    expect(customer).toBeDefined();
    expect(password).not.toBe(customer.password);
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw a BadRequestException when creating a new account with an existing email', async() => {
    const spyOnTransaction = jest.spyOn(repository.manager, 'transaction');
    const spyOnEntityManagerQuery = jest.spyOn(mockedManager, 'query');
    const spyOnEntityManagerFindOneBy = jest.spyOn(mockedManager, 'findOneBy');
    const spyOnEntityManagerCreate = jest.spyOn(mockedManager, 'create');
    const spyOnEntityManagerSave = jest.spyOn(mockedManager, 'save');
    
    await service.signUp({ email, password }, Roles.Customer);
    await expect(service.signUp({ email, password }, Roles.Customer))
      .rejects.toThrow(BadRequestException);
    
    expect(spyOnTransaction).toHaveBeenCalledTimes(2);
    expect(spyOnEntityManagerQuery).toHaveBeenCalledTimes(2);
    expect(spyOnEntityManagerFindOneBy).toHaveBeenCalledWith(Account, { email });
    expect(spyOnEntityManagerFindOneBy).toHaveBeenCalledTimes(2);
    expect(spyOnEntityManagerCreate).toHaveBeenCalledTimes(1);
    expect(spyOnEntityManagerSave).toHaveBeenCalledTimes(1);
  });

  it('should return a token when used signin with correct customer credentials', async() => {
    const spyOnFindOne = jest.spyOn(repository, 'findOne');
    const spyOnAsignJWT = jest.spyOn(jwtService, 'signAsync');
    const spyOnConfigJWTExpiration = jest.spyOn(configService, 'get');
    
    await service.signUp({ email, password }, Roles.Customer);
    const customer = await service.signIn({ email, password, rememberMe: false }, Roles.Customer);
    const JWTPayloadImitation = { id: customer.id, email: customer.email, role: customer.role };

    expect(customer).toBeDefined();
    expect(customer.token).toBeDefined();
    expect(typeof customer.token).toEqual("string");
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toHaveBeenCalledWith({ where: { email } });
    expect(spyOnConfigJWTExpiration).toHaveBeenCalledTimes(1);
    expect(spyOnAsignJWT).toHaveBeenCalledTimes(1);
    expect(spyOnAsignJWT).toHaveBeenCalledWith(JWTPayloadImitation, { expiresIn: JWTExpirationMap[JWTEexpirations.REGULAR] });
  });


  it('should return a token when used signin with correct customer credentials with remembering option', async() => {
    const spyOnFindOne = jest.spyOn(repository, 'findOne');
    const spyOnAsignJWT = jest.spyOn(jwtService, 'signAsync');
    const spyOnConfigJWTExpiration = jest.spyOn(configService, 'get');
    
    await service.signUp({ email, password }, Roles.Customer);
    const customer = await service.signIn({ email, password, rememberMe: true }, Roles.Customer);
    const JWTPayloadImitation = { id: customer.id, email: customer.email, role: customer.role };

    expect(customer).toBeDefined();
    expect(customer.token).toBeDefined();
    expect(typeof customer.token).toEqual("string");
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toHaveBeenCalledWith({ where: { email } });
    expect(spyOnConfigJWTExpiration).toHaveBeenCalledTimes(2);
    expect(spyOnAsignJWT).toHaveBeenCalledTimes(1);
    expect(spyOnAsignJWT).toHaveBeenCalledWith(JWTPayloadImitation, { expiresIn: JWTExpirationMap[JWTEexpirations.REMEMBER_ME] });
  });

  it('should return a token when used signin with correct admin credentials', async() => {
    const spyOnFindOne = jest.spyOn(repository, 'findOne');
    const spyOnAsignJWT = jest.spyOn(jwtService, 'signAsync');
    const spyOnConfigJWTExpiration = jest.spyOn(configService, 'get');
    
    await service.signUp({ email, password }, Roles.Admin);
    const admin = await service.signIn({ email, password, rememberMe: false }, Roles.Admin);
    const JWTPayloadImitation = { id: admin.id, email: admin.email, role: admin.role };

    expect(admin).toBeDefined();
    expect(admin.token).toBeDefined();
    expect(typeof admin.token).toEqual("string");
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toHaveBeenCalledWith({ where: { email } });
    expect(spyOnConfigJWTExpiration).toHaveBeenCalledTimes(1);
    expect(spyOnAsignJWT).toHaveBeenCalledTimes(1);
    expect(spyOnAsignJWT).toHaveBeenCalledWith(JWTPayloadImitation, { expiresIn: JWTExpirationMap[JWTEexpirations.ADMIN] });
  });

  it('should return a token when used signin with correct admin credentials with remembering option', async() => {
    const spyOnFindOne = jest.spyOn(repository, 'findOne');
    const spyOnAsignJWT = jest.spyOn(jwtService, 'signAsync');
    const spyOnConfigJWTExpiration = jest.spyOn(configService, 'get');
    
    await service.signUp({ email, password }, Roles.Admin);
    const admin = await service.signIn({ email, password, rememberMe: true }, Roles.Admin);
    const JWTPayloadImitation = { id: admin.id, email: admin.email, role: admin.role };

    expect(admin).toBeDefined();
    expect(admin.token).toBeDefined();
    expect(typeof admin.token).toEqual("string");
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toHaveBeenCalledWith({ where: { email } });
    expect(spyOnConfigJWTExpiration).toHaveBeenCalledTimes(2);
    expect(spyOnAsignJWT).toHaveBeenCalledTimes(1);
    expect(spyOnAsignJWT).toHaveBeenCalledWith(JWTPayloadImitation, { expiresIn: JWTExpirationMap[JWTEexpirations.REMEMBER_ME] });
  });

  it('should throw a BadRequestException if signed in with wrong customer email', async() => {
    const spyOnFindOne = jest.spyOn(repository, 'findOne');
    const spyOnAsignJWT = jest.spyOn(jwtService, 'signAsync');
    const spyOnConfigJWTExpiration = jest.spyOn(configService, 'get');
    
    const customer = await service.signUp({ email, password }, Roles.Customer);
    await expect(service.signIn({ email: wrongEmail, password, rememberMe: false }, Roles.Customer))
      .rejects.toThrow(BadRequestException);

    expect(customer).toBeDefined();
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toHaveBeenCalledWith({ where: { email: wrongEmail } });
    expect(spyOnConfigJWTExpiration).not.toHaveBeenCalled();;
    expect(spyOnAsignJWT).not.toHaveBeenCalled();
  });

  it('should throw a BadRequestException if signed in with wrong customer password', async() => {
    const spyOnFindOne = jest.spyOn(repository, 'findOne');
    const spyOnAsignJWT = jest.spyOn(jwtService, 'signAsync');
    const spyOnConfigJWTExpiration = jest.spyOn(configService, 'get');
    
    const customer = await service.signUp({ email, password }, Roles.Customer);
    await expect(service.signIn({ email, password: wrongPassword, rememberMe: false }, Roles.Customer))
      .rejects.toThrow(BadRequestException);

    expect(customer).toBeDefined();
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toHaveBeenCalledWith({ where: { email } });
    expect(spyOnConfigJWTExpiration).not.toHaveBeenCalled();;
    expect(spyOnAsignJWT).not.toHaveBeenCalled();
  });

  it('should throw a BadRequestException if signed in with wrong role', async() => {
    const spyOnFindOne = jest.spyOn(repository, 'findOne');
    const spyOnAsignJWT = jest.spyOn(jwtService, 'signAsync');
    const spyOnConfigJWTExpiration = jest.spyOn(configService, 'get');
    
    const customer = await service.signUp({ email, password }, Roles.Customer);
    await expect(service.signIn({ email, password, rememberMe: false }, Roles.Admin))
      .rejects.toThrow(BadRequestException);

    expect(customer).toBeDefined();
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toHaveBeenCalledWith({ where: { email } });
    expect(spyOnConfigJWTExpiration).not.toHaveBeenCalled();
    expect(spyOnAsignJWT).not.toHaveBeenCalled();
  });

  it('should throw a BadRequestException if signed in with pending account', async() => {
    const spyOnFindOne = jest.spyOn(repository, 'findOne');
    const spyOnAsignJWT = jest.spyOn(jwtService, 'signAsync');
    const spyOnConfigJWTExpiration = jest.spyOn(configService, 'get');
    
    const customer = await service.signUp({ email, password, status: AccountStatus.Pending }, Roles.Customer);
    await expect(service.signIn({ email, password, rememberMe: false }, Roles.Customer))
      .rejects.toThrow(BadRequestException);

    expect(customer).toBeDefined();
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toHaveBeenCalledWith({ where: { email } });
    expect(spyOnConfigJWTExpiration).not.toHaveBeenCalled();
    expect(spyOnAsignJWT).not.toHaveBeenCalled();
  });

  it('should throw a BadRequestException if signed in with wrong suspended account', async() => {
    const spyOnFindOne = jest.spyOn(repository, 'findOne');
    const spyOnAsignJWT = jest.spyOn(jwtService, 'signAsync');
    const spyOnConfigJWTExpiration = jest.spyOn(configService, 'get');
    
    const customer = await service.signUp({ email, password, status: AccountStatus.Suspended }, Roles.Customer);
    await expect(service.signIn({ email, password, rememberMe: false }, Roles.Customer))
      .rejects.toThrow(BadRequestException);

    expect(customer).toBeDefined();
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toHaveBeenCalledWith({ where: { email } });
    expect(spyOnConfigJWTExpiration).not.toHaveBeenCalled();
    expect(spyOnAsignJWT).not.toHaveBeenCalled();
  });

  it('should throw a BadRequestException if signed in with wrong deleted account', async() => {
    const spyOnFindOne = jest.spyOn(repository, 'findOne');
    const spyOnAsignJWT = jest.spyOn(jwtService, 'signAsync');
    const spyOnConfigJWTExpiration = jest.spyOn(configService, 'get');
    
    const customer = await service.signUp({ email, password, status: AccountStatus.Deleted }, Roles.Customer);
    await expect(service.signIn({ email, password, rememberMe: false }, Roles.Customer))
      .rejects.toThrow(BadRequestException);

    expect(customer).toBeDefined();
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toHaveBeenCalledWith({ where: { email } });
    expect(spyOnConfigJWTExpiration).not.toHaveBeenCalled();
    expect(spyOnAsignJWT).not.toHaveBeenCalled();
  });
});