import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SignUpAdminDto } from './../src/account/dtos/signup-admin.dto';
import { Roles } from './../src/account/constants/rolePermissions';
import { mockAccount } from './mocks';
import { DataSource } from 'typeorm';

const sampleAccount = { email: mockAccount.email, password: mockAccount.password };

describe('Account (e2e)', () => {
  let app: INestApplication;
  let dataSource : DataSource;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterEach(async() => {
    const repository = dataSource.getRepository('Account');
    await repository.query(`TRUNCATE TABLE account RESTART IDENTITY CASCADE;`);    
    await app.close();
  });

  const adminSignUp = async(accountData: SignUpAdminDto) => {
    const { body } = await request(app.getHttpServer())
      .post('/account/basement')
      .send(accountData)
      .expect(201);
    
    return body;
  };

  it('db connection to app should be established', async() => {
    const isConnected = dataSource.isInitialized;
    expect(isConnected).toBe(true);
  })


  it('should be able to signup as admin | /account/basement (POST)', async() => {
    const response = await adminSignUp(sampleAccount);

    expect(response).toBeDefined();
    expect(response.success).toBe(true);
    expect(response.msg).toBe('ACCOUNT_CREATED');
    expect(response.data.id).toBeDefined();
    expect(response.data.email).toEqual(sampleAccount.email);
    expect(response.data.role).toEqual(Roles.Admin);
  });

  it('should throw a BadRequest error | /account/basement (POST)', async() => {
    const createdAccount = await adminSignUp(sampleAccount);
    const { body: response } = await request(app.getHttpServer())
      .post('/account/basement')
      .send(sampleAccount)
      .expect(400);

    expect(createdAccount).toBeDefined();
    expect(createdAccount.success).toBe(true);
    expect(response).toBeDefined();
    expect(response.success).toBe(false);
    expect(response.msg).toEqual("EMAIL_IS_TAKEN");
  });

  it('should be able to signin as admin and receive token | /account/basement/token (POST)', async() => {
    const { data: createdAccount } = await adminSignUp(sampleAccount);
    const { body: response } = await request(app.getHttpServer())
      .post('/account/basement/token')
      .send({ ...sampleAccount, rememberMe: false })
      .expect(200);

    expect(response).toBeDefined();
    expect(response.success).toBe(true);
    expect(response.msg).toBe('ACCOUNT_LOGGEDIN');
    expect(response.data.id).toEqual(createdAccount.id);
    expect(response.data.email).toEqual(createdAccount.email);
    expect(response.data.role).toEqual(Roles.Admin);
    expect(response.data.token).toBeDefined();
    expect(typeof response.data.token).toEqual('string');
  });

  it('should throw a BadRequest error when attempting to login with non-existing credentials | /account/basement/token (POST)', async() => {
    const { body: response } = await request(app.getHttpServer())
      .post('/account/basement/token')
      .send({ ...sampleAccount, rememberMe: false })
      .expect(400);

    expect(response).toBeDefined();
    expect(response.success).toBe(false);
    expect(response.msg).toBe('WRONG_CREDENTIALS');
  });


  it('should throw a BadRequest error when attempting to login with wrong email | /account/basement/token (POST)', async() => {
    await adminSignUp(sampleAccount);
    const { body: response } = await request(app.getHttpServer())
      .post('/account/basement/token')
      .send({ ...sampleAccount, email: 'wrong@test.com', rememberMe: false })
      .expect(400);

    expect(response).toBeDefined();
    expect(response.success).toBe(false);
    expect(response.msg).toBe('WRONG_CREDENTIALS');
  });

  it('should throw a BadRequest error when attempting to login with wrong password | /account/basement/token (POST)', async() => {
    await adminSignUp(sampleAccount);
    const { body: response } = await request(app.getHttpServer())
      .post('/account/basement/token')
      .send({ ...sampleAccount, password: 'wrongpass', rememberMe: false })
      .expect(400);

    expect(response).toBeDefined();
    expect(response.success).toBe(false);
    expect(response.msg).toBe('WRONG_CREDENTIALS');
  });

  it('should verify request token | /account/checkToken (POST)', async() => {
    await adminSignUp(sampleAccount);
    const { body: response } = await request(app.getHttpServer())
      .post('/account/basement/token')
      .send({ ...sampleAccount, rememberMe: false })
      .expect(200);

    const { body: tokenResponse } = await request(app.getHttpServer())
      .get('/account/checkToken')
      .set({ authorization: `Bearer ${response.data.token}`})
      .expect(200)
   

    expect(response.success).toBe(true);
    expect(response.data.token).toBeDefined();
    expect(typeof response.data.token).toEqual("string");
    expect(tokenResponse).toBeDefined();
    expect(tokenResponse.success).toBe(true);
    expect(tokenResponse.msg).toEqual('TOKEN_VERIFIED');
    expect(tokenResponse.data.id).toEqual(response.data.id);
  });

  it('should throw an Unauthorized error when request token not provided | /account/checkToken (POST)', async() => {
    const { body: tokenResponse } = await request(app.getHttpServer())
      .get('/account/checkToken')
      .expect(401)

    expect(tokenResponse).toBeDefined();
    expect(tokenResponse.success).toBe(false);
    expect(tokenResponse.msg).toEqual('TOKEN_NOT_PROVIDED');
  });

  it('should throw an Unauthorized error when provided wrong or expired token | /account/checkToken (POST)', async() => {
    const { body: tokenResponse } = await request(app.getHttpServer())
      .get('/account/checkToken')
      .set({ authorization: `Bearer token`})
      .expect(401)

    expect(tokenResponse).toBeDefined();
    expect(tokenResponse.success).toBe(false);
    expect(tokenResponse.msg).toEqual('Unauthorized');
  });
});
