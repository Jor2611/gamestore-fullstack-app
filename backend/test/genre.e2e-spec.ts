import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';


describe('Genre (e2e)', () => {
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
    await app.close();
  });

  it('db connection to app should be established', async() => {
    const isConnected = dataSource.isInitialized;
    expect(isConnected).toBe(true);
  })

  it('should be able to fetch all genres | /genre (GET)', async() => {
    const { body: response } = await request(app.getHttpServer())
      .get('/genre')
      .expect(200);

    expect(response.success).toBe(true);
    expect(response.msg).toEqual('GENRES_FETCHED');
    expect(response.data).toBeInstanceOf(Array);
  });
});
