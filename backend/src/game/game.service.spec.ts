import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GameService } from './game.service';
import { Game } from './game.entity';
import { Genre } from '../../src/genre/genre.entity';
import { Platform } from '../../src/platform/platform.entity';
import { mockGames, mockGenres, mockPlatforms, provideGameDetails } from '../../test/mocks/helpers';
import { RepositoryMock } from '../../test/mocks/RepositoryBuilder';


describe('GameService', () => {
  let service: GameService;
  let repository: Repository<Game>;
  let genreRepository: Repository<Genre>;
  let platformRepository: Repository<Platform>;

  const repositoryMock = new RepositoryMock<Game>(Game)
    .withQueryBuilder()
    .withEntityManager()
    .build();
  const genreRepositoryMock = new RepositoryMock<Genre>(Genre).build();
  const platformRepositoryMock = new RepositoryMock<Platform>(Platform).build();
  
  //Since this is a game service, and we're focusing on 
  //unit tests that isolate specific functionalities, 
  //it's acceptable to seed data once at the beginning 
  //and avoid resetting it for every test case.
  genreRepositoryMock.seedCollections({ genres: mockGenres});
  platformRepositoryMock.seedCollections({ platforms: mockPlatforms});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getRepositoryToken(Game),
          useValue: repositoryMock
        },
        {
          provide: getRepositoryToken(Genre),
          useValue: genreRepositoryMock
        },
        {
          provide: getRepositoryToken(Platform),
          useValue: platformRepositoryMock
        }
      ],
    }).compile();

    service = module.get<GameService>(GameService);
    repository = module.get<Repository<Game>>(getRepositoryToken(Game));
    genreRepository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
    platformRepository = module.get<Repository<Platform>>(getRepositoryToken(Platform));
    const games = mockGames(mockGenres, mockPlatforms, 30);  // Initialize the games  
    repositoryMock.seedCollections({ games, genres: mockGenres, platforms: mockPlatforms });
  });

  afterEach(()=> {
    jest.clearAllMocks();
    repositoryMock.resetData();
  });


  /**
   * Test Cases
   */

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully find one game by id', async() => {
    const spyOnGameFindOne = jest.spyOn(repository, 'findOne');
    const fifthGameId = 5;

    const foundGame = await service.findOne(fifthGameId);

    expect(foundGame.id).toEqual(fifthGameId);
    expect(spyOnGameFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnGameFindOne).toHaveBeenCalledWith({ where: { id: fifthGameId }, relations: ['platforms', 'genres'] });
  });

  it('should throw a NotFoundException when provided non-existing game id to find one game method', async() => {
    const spyOnGameFindOne = jest.spyOn(repository, 'findOne');

    await expect(service.findOne(785)).rejects.toThrow(NotFoundException);

    expect(spyOnGameFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnGameFindOne).toHaveBeenCalledWith({ where: { id: 785 }, relations: ['platforms', 'genres'] });
  });

  it('should successfully create a game', async() => {
    const spyOnGenreFindBy = jest.spyOn(genreRepository, 'findBy');
    const spyOnPlatformFindBy = jest.spyOn(platformRepository, 'findBy');
    const spyOnGameCreate = jest.spyOn(repository, 'create');
    const spyOnGameSave = jest.spyOn(repository, 'save');
    const { newGameDetails } = provideGameDetails();

    // Using spread for avoiding newGameInputData to be mutated by reference
    const createdGame = await service.create({...newGameDetails});
    let createdGameImitation ={ 
      ...newGameDetails, 
      genres: createdGame.genres, 
      platforms: createdGame.platforms 
    };

    delete createdGameImitation.genreIds;
    delete createdGameImitation.platformIds;

    expect(createdGame).toBeDefined();
    expect(spyOnGenreFindBy).toHaveBeenCalledWith({ id: In(newGameDetails.genreIds) });
    expect(spyOnPlatformFindBy).toHaveBeenCalledWith({ id: In(newGameDetails.platformIds) });
    expect(spyOnGameCreate).toHaveBeenCalledWith(createdGameImitation);
    expect(spyOnGameSave).toHaveBeenCalledWith(createdGameImitation);
    expect(createdGame).not.toHaveProperty('genreIds');
    expect(createdGame).not.toHaveProperty('platformIds');
    expect(createdGame).toHaveProperty('platforms');
    expect(createdGame).toHaveProperty('genres');
  });

  it('should return a page of games and count of all existing games', async() => {
    const spyOnCreateQueryBuilder = jest.spyOn(repository, 'createQueryBuilder');
    const QueryBuilderMock = repositoryMock.queryBuilderMock;  
    const spyOnLeftJoinAndSelect = jest.spyOn(QueryBuilderMock, 'leftJoinAndSelect');
    const spyOnQueryBuilderSkip = jest.spyOn(QueryBuilderMock, 'skip');
    const spyOnQueryBuilderTake = jest.spyOn(QueryBuilderMock, 'take');
    const spyOnQueryBuilderGetMany = jest.spyOn(QueryBuilderMock, 'getMany');
    const spyOnQueryBuilderGetCount = jest.spyOn(QueryBuilderMock, 'getCount');

    const { games: gamePage, count: gameCount } = await service.list({ page: 2, size: 5 })
    
    expect(spyOnCreateQueryBuilder).toHaveBeenCalledTimes(1);
    expect(spyOnCreateQueryBuilder).toHaveBeenCalledWith('game');
    expect(spyOnLeftJoinAndSelect).toHaveBeenCalledTimes(2);
    expect(spyOnLeftJoinAndSelect).toHaveBeenCalledWith('game.platforms', 'platform');
    expect(spyOnLeftJoinAndSelect).toHaveBeenCalledWith('game.genres', 'genre');
    expect(spyOnQueryBuilderSkip).toHaveBeenCalledTimes(1);
    expect(spyOnQueryBuilderTake).toHaveBeenCalledTimes(1);
    expect(spyOnQueryBuilderGetMany).toHaveBeenCalledTimes(1);
    expect(spyOnQueryBuilderGetCount).toHaveBeenCalledTimes(1);
    expect(gamePage).toBeInstanceOf(Array);
    expect(gamePage.length).toBeLessThanOrEqual(5);
    expect(gameCount).toEqual(30);
  });


  it('should return a page of games and count of all existing games with negative argument values', async() => {
    const spyOnCreateQueryBuilder = jest.spyOn(repository, 'createQueryBuilder');
    const QueryBuilderMock = repositoryMock.queryBuilderMock;
    const spyOnLeftJoinAndSelect = jest.spyOn(QueryBuilderMock, 'leftJoinAndSelect');
    const spyOnQueryBuilderSkip = jest.spyOn(QueryBuilderMock, 'skip');
    const spyOnQueryBuilderTake = jest.spyOn(QueryBuilderMock, 'take');
    const spyOnQueryBuilderGetMany = jest.spyOn(QueryBuilderMock, 'getMany');
    const spyOnQueryBuilderGetCount = jest.spyOn(QueryBuilderMock, 'getCount');

    const { games: gamePage, count: gameCount } = await service.list({ page: -2, size: -10 })
    
    expect(spyOnCreateQueryBuilder).toHaveBeenCalledTimes(1);
    expect(spyOnCreateQueryBuilder).toHaveBeenCalledWith('game');
    expect(spyOnLeftJoinAndSelect).toHaveBeenCalledTimes(2);
    expect(spyOnLeftJoinAndSelect).toHaveBeenCalledWith('game.platforms', 'platform');
    expect(spyOnLeftJoinAndSelect).toHaveBeenCalledWith('game.genres', 'genre');
    expect(spyOnQueryBuilderSkip).toHaveBeenCalledTimes(1);
    expect(spyOnQueryBuilderTake).toHaveBeenCalledTimes(1);
    expect(spyOnQueryBuilderGetMany).toHaveBeenCalledTimes(1);
    expect(spyOnQueryBuilderGetCount).toHaveBeenCalledTimes(1);
    expect(gamePage).toBeInstanceOf(Array);
    expect(gamePage.length).toBeLessThanOrEqual(10);
    expect(gameCount).toEqual(30);
  });

  it('should successfully update game details', async() => {
    const mockedManager = repositoryMock.entityManagerMock;
    const spyOnEntityManagerFindOne = jest.spyOn(mockedManager, 'findOne');
    const spyOnEntityManagerFindBy = jest.spyOn(mockedManager, 'findBy');
    const spyOnEntityManagerSave = jest.spyOn(mockedManager, 'save');
    const fifthGameId = 5;

    const updatedGame = await service.update(fifthGameId, { name: "Updated Game" })

    expect(spyOnEntityManagerFindOne).toHaveBeenCalled();
    expect(spyOnEntityManagerFindOne).toHaveBeenCalledWith(Game, { where: { id: fifthGameId }, relations: ['genres', 'platforms'] });
    expect(spyOnEntityManagerFindBy).not.toHaveBeenCalled();
    expect(spyOnEntityManagerSave).toHaveBeenCalled();
    expect(updatedGame.id).toEqual(fifthGameId);
    expect(updatedGame.name).toEqual("Updated Game");
  });

  it('should throw a NotfoundException when calling update with non-existing game id', async() => {
    const mockedManager = repositoryMock.entityManagerMock;
    const spyOnEntityManagerFindOne = jest.spyOn(mockedManager, 'findOne');
    const spyOnEntityManagerFindBy = jest.spyOn(mockedManager, 'findBy');
    const spyOnEntityManagerSave = jest.spyOn(mockedManager, 'save');
    const fakeGameId = 31;

    await expect(service.update(fakeGameId, { name: "Updated Game" }))
      .rejects.toThrow(NotFoundException);

    expect(spyOnEntityManagerFindOne).toHaveBeenCalled();
    expect(spyOnEntityManagerFindOne).toHaveBeenCalledWith(Game, { where: { id: fakeGameId }, relations: ['genres', 'platforms'] });
    expect(spyOnEntityManagerFindBy).not.toHaveBeenCalled();
    expect(spyOnEntityManagerSave).not.toHaveBeenCalled();
  });

  it('should successfully update game details with platforms and genres included', async() => {
    const mockedManager = repositoryMock.entityManagerMock;
    const spyOnEntityManagerFindOne = jest.spyOn(mockedManager, 'findOne');
    const spyOnEntityManagerFindBy = jest.spyOn(mockedManager, 'findBy');
    const spyOnEntityManagerSave = jest.spyOn(mockedManager, 'save');
    const { gameUpdateDetails } = provideGameDetails();
    const fifthGameId = 4;

    const updatedGame = await service.update(fifthGameId, { ...gameUpdateDetails })

    const isGenresUpdated = updatedGame.genres.every((_genre) => gameUpdateDetails.genreIds.includes(_genre.id));
    const isPlatformUpdated = updatedGame.platforms.every((_platform) => gameUpdateDetails.platformIds.includes(_platform.id));
    
    expect(spyOnEntityManagerFindOne).toHaveBeenCalled();
    expect(spyOnEntityManagerFindOne).toHaveBeenCalledWith(Game, { where: { id: fifthGameId }, relations: ['genres', 'platforms'] });
    expect(spyOnEntityManagerFindBy).toHaveBeenCalledTimes(2);
    expect(spyOnEntityManagerSave).toHaveBeenCalled();
    expect(updatedGame.id).toEqual(fifthGameId);
    expect(updatedGame.name).toEqual("Updated Game");
    expect(updatedGame.genres).toHaveLength(gameUpdateDetails.genreIds.length);
    expect(updatedGame.platforms).toHaveLength(gameUpdateDetails.platformIds.length);
    expect(isGenresUpdated).toBe(true);
    expect(isPlatformUpdated).toBe(true);
  });

  it('should successfully delete a game', async() => {
    const spyOnGameFindOne = jest.spyOn(repository, 'findOne');
    const spyOnGameRemove = jest.spyOn(repository, 'remove');
    const fifthGameId = 5;

    const game = await service.delete(fifthGameId);
    const collection = await repositoryMock.collection();

    expect(collection).toHaveLength(29);
    expect(spyOnGameFindOne).toHaveBeenCalledWith({ where: { id: fifthGameId } }); 
    expect(spyOnGameRemove).toHaveBeenCalledWith(game);
  });

  it('should throw a NotFoundExcetion when provided non-existing game\'s id', async() => {
    const spyOnGameFindOne = jest.spyOn(repository, 'findOne');
    const spyOnGameRemove = jest.spyOn(repository, 'remove');
    const nonExistingId = 31;

    await expect(service.delete(nonExistingId)).rejects.toThrow(NotFoundException);
    const collection = await repositoryMock.collection();

    expect(collection).toHaveLength(30);
    expect(spyOnGameFindOne).toHaveBeenCalledWith({ where: { id: nonExistingId } });
    expect(spyOnGameRemove).not.toHaveBeenCalled();
  });
});
