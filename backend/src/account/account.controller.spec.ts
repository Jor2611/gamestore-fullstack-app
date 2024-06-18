import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { SignUpAdminDto } from './dtos/signup-admin.dto';
import { Roles } from './constants/rolePermissions';
import { Account } from './account.entity';
import { SignInDto } from './dtos/signin.dto';
import { mockAccount } from '../../test/mocks/helpers';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';


const {
  email,
  password
} = mockAccount;

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;
  let accounts: Account[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            signUp: jest.fn().mockImplementation(async(signUpData: SignUpAdminDto, role: Roles): Promise<Account> => {
              const accountExists = accounts.some((_account) => _account.email === signUpData.email);
             
              if(accountExists){
                throw new BadRequestException('EMAIL_IS_TAKEN');
              }
             
              const account = { id: Math.floor(Math.random() * 999), ...signUpData, role } as Account;
              accounts.push(account);
              return account;
            }),
            signIn: jest.fn().mockImplementation(async(signInData: SignInDto, role: Roles) => {
              const { email, password } = signInData;
              const account = accounts.find(_account => _account.email === email && _account.password === password);
              
              if(!account){
                throw new BadRequestException('WRONG_CREDENTIALS');
              }
              
              return { token: "TOKEN", ...account };
            })
          }
        }
      ]
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  afterEach(() => {
    accounts = [];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return results of verified JWT token', async() => {
    const request = {
      accessType: 'all',
      query: { token: 'ImJWTTokenn' },
      decoded: { id: 123, profile_id: 152, email, role: Roles.Admin, iat: 123564, exp: 1535 }
    } as unknown as Request;

    const { msg, data } = await controller.checkToken(request);
  
    expect(msg).toEqual('TOKEN_VERIFIED');
    expect(data.id).toEqual(request.decoded.id);
    expect(data.profile_id).toEqual(request.decoded.profile_id);
  });

  it('should return unsuccessful response when token not provided', async() => {
    const request = { query: { token: '' } } as unknown as Request;

    await expect(controller.checkToken(request)).rejects.toThrow(UnauthorizedException);
  });

  it('should signup a new admin account', async() => {
    const spyOnAccountSignUp = jest.spyOn(service, 'signUp');
    const signUpCredentials = { email, password };

    const response = await controller.signUpAsAdmin(signUpCredentials);

    expect(response).toBeDefined();
    expect(accounts).toHaveLength(1);
    expect(spyOnAccountSignUp).toHaveBeenCalledTimes(1);
    expect(spyOnAccountSignUp).toHaveBeenCalledWith(signUpCredentials, Roles.Admin);
  });

  it('should throw a BadRequestException when trying to signup with existing admin accounts email', async() => {
    const spyOnAccountSignUp = jest.spyOn(service, 'signUp');
    const signUpCredentials = { email, password };

    const response = await controller.signUpAsAdmin(signUpCredentials);
    await expect(controller.signUpAsAdmin(signUpCredentials)).rejects.toThrow(BadRequestException);

    expect(response).toBeDefined();
    expect(accounts).toHaveLength(1);
    expect(spyOnAccountSignUp).toHaveBeenCalledTimes(2);
    expect(spyOnAccountSignUp).toHaveBeenCalledWith(signUpCredentials, Roles.Admin);
  });


  it('should signin a new account', async() => {
    const spyOnAccountSignIn = jest.spyOn(service, 'signIn');
    const signInCredentials = { email, password, rememberMe: false };

    await controller.signUpAsAdmin({ email, password });
    const response = await controller.signInAsAdmin(signInCredentials);

    expect(response).toBeDefined();
    expect(response.data.token).toBeDefined();
    expect(accounts).toHaveLength(1);
    expect(spyOnAccountSignIn).toHaveBeenCalledTimes(1);
    expect(spyOnAccountSignIn).toHaveBeenCalledWith(signInCredentials, Roles.Admin);
  });

  it('should throw a BadRequestException when attempting to sign in with wrong email', async() => {
    const spyOnAccountSignIn = jest.spyOn(service, 'signIn');
    const signInCredentials = {  email: "wrong@email.com", password, rememberMe: false };

    await controller.signUpAsAdmin({ email, password });
    await expect(controller.signInAsAdmin(signInCredentials)).rejects.toThrow(BadRequestException);

    expect(accounts).toHaveLength(1);
    expect(spyOnAccountSignIn).toHaveBeenCalledTimes(1);
    expect(spyOnAccountSignIn).toHaveBeenCalledWith(signInCredentials, Roles.Admin);
  });

  it('should throw a BadRequestException when attempting to sign in with wrong password', async() => {
    const spyOnAccountSignIn = jest.spyOn(service, 'signIn');
    const signInCredentials = { email, password: 'wwrongpassword123', rememberMe: false };

    await controller.signUpAsAdmin({ email, password });
    await expect(controller.signInAsAdmin(signInCredentials)).rejects.toThrow(BadRequestException);

    expect(accounts).toHaveLength(1);
    expect(spyOnAccountSignIn).toHaveBeenCalledTimes(1);
    expect(spyOnAccountSignIn).toHaveBeenCalledWith(signInCredentials, Roles.Admin);
  });
});
