import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { mockAccount, mockGames, mockGenres, mockPlatforms } from './mocks';

describe('Game (e2e)', () => {
  let app: INestApplication;
  let dataSource : DataSource;

  /**
   * Hooks
   */

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterEach(async() => {
    const accountRepository = dataSource.getRepository('Account');
    const gameRepository = dataSource.getRepository('Game');

    await accountRepository.query(`TRUNCATE TABLE account RESTART IDENTITY CASCADE;`);  
    await gameRepository.query(`DELETE FROM game WHERE id>19;`);  //Clean up all games besides seeded ones.
    await app.close();
  });


  /**
   * Helpers
   */

  const provideAccountToken = async() => {
    const sampleAccount = { email: mockAccount.email, password: mockAccount.password };
    await request(app.getHttpServer())
      .post('/account/basement')
      .send(sampleAccount)
      .expect(201)

    const { body: response } = await request(app.getHttpServer())
      .post('/account/basement/token')
      .send({ ...sampleAccount, rememberMe: false })
      .expect(200);
    
    const token = response.data.token; 
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    return token;
  };

  const provideGameDetails = () => {
    const { 
      id, 
      genres, 
      platforms, 
      createdAt, 
      updatedAt, 
      ...gameData 
    } = mockGames(mockGenres, mockPlatforms, 1)[0];
    
    const newGameDetails = {
      ...gameData,
      rating: parseFloat(gameData.rating),
      metacritic: parseFloat(gameData.metacritic),
      platformIds: [1, 2, 3],
      genreIds: [2, 4, 5],
    };

    const gameUpdateDetails = { 
      name: 'Updated Game', 
      platformIds: [4,5], 
      genreIds: [1,3] 
    };

    return { newGameDetails, gameUpdateDetails };
  };

  /**
   * Tests
   */

  it('db connection to app should be established', async() => {
    const isConnected = dataSource.isInitialized;
    expect(isConnected).toBe(true);
  });

  it('should be able to fetch games with pagination | /game (GET)', async() => {
    const { body: response } = await request(app.getHttpServer())
      .get('/game')
      .query({ page: 1, size: 10 })
      .expect(200);

    expect(response.msg).toEqual('GAMES_FETCHED');
    expect(response.data).toBeDefined();
    expect(typeof response.data.count).toEqual('number');
    expect(response.data.games).toBeInstanceOf(Array);
    expect(response.data.games.length).toBeLessThanOrEqual(10);
  });

  it('should be able to fetch games with pagination when provided non-positive values | /game (GET)', async() => {
    const { body: response } = await request(app.getHttpServer())
      .get('/game')
      .query({ page: -1, size: -10 })
      .expect(200);

    expect(response.msg).toEqual('GAMES_FETCHED');
    expect(response.data).toBeDefined();
    expect(typeof response.data.count).toEqual('number');
    expect(response.data.games).toBeInstanceOf(Array);
    expect(response.data.games.length).toBeLessThanOrEqual(10);
  });

  it('should throw a BadRequest error when not provided vales for pagination | /game (GET)', async() => {
    const { body: response } = await request(app.getHttpServer())
      .get('/game')
      .expect(400);
    
    expect(response.success).toBe(false);
  });

  it('should fetch a game with id', async() => {
    const gameId = 1;
    const { body: response } = await request(app.getHttpServer())
      .get(`/game/${gameId}`)
      .expect(200);

    expect(response.msg).toEqual('GAME_FETCHED');
    expect(response.data.id).toEqual(gameId);
  });

  it('should throw a NotFound error fetch when attempting to fetch a non-existing game | /game/:id (GET)', async() => {
    const gameId = 680;
    const { body: response } = await request(app.getHttpServer())
      .get(`/game/${gameId}`)
      .expect(404);

    expect(response.msg).toEqual("GAME_DOESN'T_EXIST");
    expect(response.success).toBe(false);
  });

  it('should successfully create a game | /game (POST)', async () => {
    const { newGameDetails } = provideGameDetails();
    const accountToken = await provideAccountToken();

    const { body: response } = await request(app.getHttpServer())
      .post('/game')
      .set('Authorization', `Bearer ${accountToken}`)
      .send(newGameDetails)
      .expect(201);

    expect(response.msg).toEqual('GAME_CREATED');
    expect(response.data.name).toEqual(newGameDetails.name);
  });  

  it('should throw an Unauthorized error when attempting to create a game without token | /game (POST)', async () => {
    const { newGameDetails } = provideGameDetails();

    await request(app.getHttpServer())
      .post('/game')
      .send(newGameDetails)
      .expect(401);
  });

  it('should successfully update a game | /game/:id (PATCH)', async() => {
    const { newGameDetails, gameUpdateDetails } = provideGameDetails();
    const accountToken = await provideAccountToken();

    const { body: createdGameResponse } = await request(app.getHttpServer())
      .post('/game')
      .set('Authorization', `Bearer ${accountToken}`)
      .send(newGameDetails)
      .expect(201);

    const { body: updatedGameResponse } = await request(app.getHttpServer())
      .patch(`/game/${createdGameResponse.data.id}`)
      .set('Authorization', `Bearer ${accountToken}`)
      .send(gameUpdateDetails)
      .expect(200);

    const createdGame = createdGameResponse.data;
    const updatedGame = updatedGameResponse.data; 

    expect(createdGameResponse.success).toBe(true);
    expect(updatedGameResponse.success).toBe(true);
    expect(createdGameResponse.msg).toEqual('GAME_CREATED');
    expect(updatedGameResponse.msg).toEqual('GAME_UPDATED');
    expect(createdGame.id).toEqual(updatedGame.id);
    expect(updatedGame.name).toEqual('Updated Game');
    expect(updatedGame.platforms).toHaveLength(2);
    expect(updatedGame.genres).toHaveLength(2);
  });

  it('should throw an Unauthorized error when attempting to update a game without token | /game/:id (PATCH)', async() => {
    const { newGameDetails, gameUpdateDetails } = provideGameDetails();
    const accountToken = await provideAccountToken();

    const { body: createdGameResponse } = await request(app.getHttpServer())
      .post('/game')
      .set('Authorization', `Bearer ${accountToken}`)
      .send(newGameDetails)
      .expect(201);

    await request(app.getHttpServer())
      .patch(`/game/${createdGameResponse.data.id}`)
      .send(gameUpdateDetails)
      .expect(401);

    expect(createdGameResponse.success).toBe(true);
    expect(createdGameResponse.msg).toEqual('GAME_CREATED');
  });

  it('should successfully delete a game | /game/:id (DELETE)', async() => {
    const { newGameDetails } = provideGameDetails();
    const accountToken = await provideAccountToken();

    const { body: createdGameResponse } = await request(app.getHttpServer())
      .post('/game')
      .set('Authorization', `Bearer ${accountToken}`)
      .send(newGameDetails)
      .expect(201);

    const response = await request(app.getHttpServer())
      .delete(`/game/${createdGameResponse.data.id}`)
      .set('Authorization', `Bearer ${accountToken}`)
      .expect(204);
    
    expect(createdGameResponse.success).toBe(true);
    expect(createdGameResponse.msg).toEqual('GAME_CREATED');
  });

  it('should throw an Unauthorized error when attempting to delete a game without token | /game/:id (DELETE)', async() => {
    const { newGameDetails } = provideGameDetails();
    const accountToken = await provideAccountToken();

    const { body: createdGameResponse } = await request(app.getHttpServer())
      .post('/game')
      .set('Authorization', `Bearer ${accountToken}`)
      .send(newGameDetails)
      .expect(201);

    await request(app.getHttpServer())
      .delete(`/game/${createdGameResponse.data.id}`)
      .expect(401);

    expect(createdGameResponse.success).toBe(true);
    expect(createdGameResponse.msg).toEqual('GAME_CREATED');
  });
});
