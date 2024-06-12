import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { SignUpAdminDto } from './dtos/signup-admin.dto';
import { Roles } from './constants/rolePermissions';
import { Account } from './account.entity';
import { SignInDto } from './dtos/signin.dto';
import { mockAccount } from '../../test/mocks';

const {
  email,
  password
} = mockAccount;

describe('AccountController', () => {
  let controller: AccountController;
  let accounts: Account[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            signUp: jest.fn().mockImplementation(async(signUpData: SignUpAdminDto, role: Roles): Promise<Account> => {
              const account = { id: Math.floor(Math.random() * 999), ...signUpData, role } as Account;
              accounts.push(account);
              return account;
            }),
            signIn: jest.fn().mockImplementation(async(signInData: SignInDto, role: Roles) => {
              const { email, password } = signInData;
              const account = accounts.filter(_account => _account.email === email && _account.password === password);
              return { token: "TOKEN", ...account };
            })
          }
        }
      ]
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  afterEach(() => {
    accounts = [];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should signup a new account', async() => {
    const response = await controller.signUpAsAdmin({ email, password });

    expect(response).toBeDefined();
    expect(accounts).toHaveLength(1);
  });

  it('should signin a new account', async() => {
    await controller.signUpAsAdmin({ email, password });
    const response = await controller.signInAsAdmin({ email, password, rememberMe: false });

    expect(response).toBeDefined();
    expect(response.data.token).toBeDefined();
    expect(accounts).toHaveLength(1);
  });
});
