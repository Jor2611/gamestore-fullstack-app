import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, EntityTarget, FindOneOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { GameService } from './game.service';
import { Game } from './game.entity';
import { Genre } from '../../src/genre/genre.entity';
import { Platform } from '../../src/platform/platform.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockGames, mockGenres, mockPlatforms } from '../../test/mocks';
import { NotFoundException } from '@nestjs/common';

/**
 * Refactor and cleanUp the code
 */

let games: Game[] = []; 
let mockedGamesList: Game[] = [];
let mockGame = null;

describe('GameService', () => {
  let service: GameService;
  let repository: Repository<Game>;
  let genreRepository: Repository<Genre>;
  let platformRepository: Repository<Platform>;

  let skipValue = 0;
  let takeValue = 10;

  const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    skip: jest.fn().mockImplementation((value) => {
      skipValue = value;
      return mockQueryBuilder;
    }),
    take: jest.fn().mockImplementation((value) => {
      takeValue = value;
      return mockQueryBuilder;
    }),
    getMany: jest.fn().mockImplementation(() => {
      return Promise.resolve(mockedGamesList.slice(skipValue, skipValue + takeValue));
    }),
    getCount: jest.fn().mockImplementation(() => {
      return Promise.resolve(mockedGamesList.length);
    }),
  };

  const mockedManager: Partial<EntityManager> = {
    findOne: jest.fn().mockImplementation(async(entityClass: EntityTarget<Game>, filter: FindOneOptions<Game>): Promise<Game> => {
      return games.find((_game) => _game.id === filter.where['id']) || null;
    }),
    findBy: jest.fn().mockImplementation(async <T extends Genre | Platform>(entityClass: EntityTarget<T>, filter: FindOptionsWhere<T>): Promise<T[]> => {
      if(entityClass === Platform){
        const platformIds = (filter.id as any)._value; 
        return mockPlatforms.filter(_platform => platformIds.includes(_platform.id)) as T[]; 
      } else if(entityClass === Genre){
        const genreIds = (filter.id as any)._value; 
        return mockGenres.filter(_genre => genreIds.includes(_genre.id)) as T[];
      } else {
        return [];
      }
    }),
    create: jest.fn().mockImplementation((entityClass: EntityTarget<Game>, data: Object): Game => ({ ...data } as Game)),
    save: jest.fn().mockImplementation(async(entityClass: EntityTarget<Game>, game: Game): Promise<Game> => {
      const gameIndex = games.indexOf(game);
      if(gameIndex > -1){
        Object.assign(games[gameIndex], { ...game, updatedAt: new Date() });
        return games[gameIndex];
      }else {
        const initialDate = new Date();
        const newGame = { id: Math.floor(Math.random() * 10000), ...game, createdAt: initialDate, updatedAt: initialDate };
        games.push(newGame);
        return newGame;
      }
    }),
    query: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getRepositoryToken(Game),
          useValue: {
            manager: {
              transaction: jest.fn((cb) => cb(mockedManager))
            },
            createQueryBuilder: jest.fn().mockImplementation((_:string) => mockQueryBuilder),
            findOne: jest.fn().mockImplementation(async(filter: FindOneOptions<Game>): Promise<Game> => {
              return games.find((_game) => _game.id === filter.where['id']) || null;
            }),
            create: jest.fn().mockImplementation((data): Game => data),
            save: jest.fn().mockImplementation(async(game: Game) => {
              const gameIndex = games.indexOf(game);
              if(gameIndex > -1){
                Object.assign(games[gameIndex], { ...game, updatedAt: new Date() });
                return games[gameIndex];
              }else {
                const initialDate = new Date();
                const newGame = { id: Math.floor(Math.random() * 10000), ...game, createdAt: initialDate, updatedAt: initialDate };
                games.push(newGame);
                return newGame;
              }
            }),
            remove: jest.fn().mockImplementation(async(game: Game) => {
              games = games.filter((_game) => _game.id !== game.id);
            })
          }
        },
        {
          provide: getRepositoryToken(Genre),
          useValue: {
            findBy: jest.fn().mockImplementation(async(query: FindOptionsWhere<Genre>): Promise<Genre[]> => {
              // Extract the array of IDs from In()
              const genreIds = (query.id as any)._value; 
              return mockGenres.filter(_genre => genreIds.includes(_genre.id)) as Genre[];
            })
          }
        },
        {
          provide: getRepositoryToken(Platform),
          useValue: {
            findBy: jest.fn().mockImplementation(async(query: FindOptionsWhere<Platform>): Promise<Platform[]> => {
              // Extract the array of IDs from In() 
              const platformIds = (query.id as any)._value; 
              return mockPlatforms.filter(_platform => platformIds.includes(_platform.id)) as Platform[]; 
            })
          }
        }
      ],
    }).compile();

    mockedGamesList = mockGames(mockGenres, mockPlatforms, 30);
    service = module.get<GameService>(GameService);
    repository = module.get<Repository<Game>>(getRepositoryToken(Game));
    genreRepository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
    platformRepository = module.get<Repository<Platform>>(getRepositoryToken(Platform));
  });

  afterEach(()=> {
    games = [];
    skipValue = 0;
    takeValue = 10;
    mockedGamesList = mockGames(mockGenres, mockPlatforms, 30);
    const {
      id: _,
      genres,
      platforms,
      ...rest
    } = mockedGamesList[0];
    mockGame = rest;
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully find one game by id', async() => {
    const spyOnGameFindOne = jest.spyOn(repository, 'findOne');
    const [genreIds, platformIds] = [[1,2,3],[2,1,5]];

    const { id, name } = await service.create({ ...mockGame, genreIds, platformIds });
    const foundGame = await service.findOne(id);

    expect(foundGame).toBeDefined();
    expect(games).toHaveLength(1);
    expect(foundGame.id).toEqual(id);
    expect(foundGame.name).toEqual(name);
    expect(spyOnGameFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnGameFindOne).toHaveBeenCalledWith({ where: { id }, relations: ['platforms', 'genres'] });
  });

  it('should return null when provided non-existing game id to find one game method', async() => {
    const spyOnGameFindOne = jest.spyOn(repository, 'findOne');
    const [genreIds, platformIds] = [[1,2,3],[2,1,5]];

    const { id } = await service.create({ ...mockGame, genreIds, platformIds });
    const foundGame = await service.findOne(id+1);

    expect(foundGame).toBeNull();
    expect(games).toHaveLength(1);
    expect(spyOnGameFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnGameFindOne).toHaveBeenCalledWith({ where: { id: id+1 }, relations: ['platforms', 'genres'] });
  });

  it('should successfully create a game', async() => {
    const spyOnGenreFindBy = jest.spyOn(genreRepository, 'findBy');
    const spyOnPlatformFindBy = jest.spyOn(platformRepository, 'findBy');
    const spyOnGameCreate = jest.spyOn(repository, 'create');
    const spyOnGameSave = jest.spyOn(repository, 'save');
    const [genreIds, platformIds] = [[1,2,3],[2,1,5]];

    const createdGame = await service.create({ ...mockGame, genreIds, platformIds });
    const createdGameImitation = { ...mockGame, genres: createdGame.genres, platforms: createdGame.platforms }; 
    
    expect(createdGame).toBeDefined();
    expect(spyOnGenreFindBy).toHaveBeenCalledWith({ id: In(genreIds) });
    expect(spyOnPlatformFindBy).toHaveBeenCalledWith({ id: In(platformIds) });
    expect(spyOnGameCreate).toHaveBeenCalledWith(createdGameImitation);
    expect(spyOnGameSave).toHaveBeenCalledWith(createdGameImitation);
    expect(createdGame).not.toHaveProperty('genreIds');
    expect(createdGame).not.toHaveProperty('platformIds');
    expect(createdGame).toHaveProperty('platforms');
    expect(createdGame).toHaveProperty('genres');
  });

  it('should return a page of games and count of all existing games', async() => {
    const spyOnCreateQueryBuilder = jest.spyOn(repository, 'createQueryBuilder');
    const spyOnLeftJoinAndSelect = jest.spyOn(mockQueryBuilder, 'leftJoinAndSelect');
    const spyOnQueryBuilderSkip = jest.spyOn(mockQueryBuilder, 'skip');
    const spyOnQueryBuilderTake = jest.spyOn(mockQueryBuilder, 'take');
    const spyOnQueryBuilderGetMany = jest.spyOn(mockQueryBuilder, 'getMany');
    const spyOnQueryBuilderGetCount = jest.spyOn(mockQueryBuilder, 'getCount');

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
    expect(gamePage).toHaveLength(5);
    expect(gameCount).toEqual(30);
  });

  it('should return a page of games and count of all existing games with negative argument values', async() => {
    const spyOnCreateQueryBuilder = jest.spyOn(repository, 'createQueryBuilder');
    const spyOnLeftJoinAndSelect = jest.spyOn(mockQueryBuilder, 'leftJoinAndSelect');
    const spyOnQueryBuilderSkip = jest.spyOn(mockQueryBuilder, 'skip');
    const spyOnQueryBuilderTake = jest.spyOn(mockQueryBuilder, 'take');
    const spyOnQueryBuilderGetMany = jest.spyOn(mockQueryBuilder, 'getMany');
    const spyOnQueryBuilderGetCount = jest.spyOn(mockQueryBuilder, 'getCount');

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
    expect(gamePage).toHaveLength(10);
    expect(gameCount).toEqual(30);
  });

  it('should successfully update game details', async() => {
    const spyOnEntityManagerFindOne = jest.spyOn(mockedManager, 'findOne');
    const spyOnEntityManagerFindBy = jest.spyOn(mockedManager, 'findBy');
    const spyOnEntityManagerSave = jest.spyOn(mockedManager, 'save');
    const [genreIds, platformIds] = [[1,2,3],[2,1,5]];
  
    const { id } = await service.create({ ...mockGame, genreIds, platformIds });
    const updatedGame = await service.update(id, { name: "Updated Game" })

    expect(id).toBeDefined();
    expect(spyOnEntityManagerFindOne).toHaveBeenCalled();
    expect(spyOnEntityManagerFindOne).toHaveBeenCalledWith(Game, { where: { id }, relations: ['genres', 'platforms'] });
    expect(spyOnEntityManagerFindBy).not.toHaveBeenCalled();
    expect(spyOnEntityManagerSave).toHaveBeenCalled();
    expect(updatedGame.id).toEqual(id);
    expect(updatedGame.name).toEqual("Updated Game");
  });

  it('should throw a NotfoundException when calling update with non-existing game id', async() => {
    const spyOnEntityManagerFindOne = jest.spyOn(mockedManager, 'findOne');
    const spyOnEntityManagerFindBy = jest.spyOn(mockedManager, 'findBy');
    const spyOnEntityManagerSave = jest.spyOn(mockedManager, 'save');
    const [genreIds, platformIds] = [[1,2,3],[2,1,5]];
  
    const { id } = await service.create({ ...mockGame, genreIds, platformIds });
    await expect(service.update(id+1, { name: "Updated Game" }))
      .rejects.toThrow(NotFoundException);

    expect(id).toBeDefined();
    expect(spyOnEntityManagerFindOne).toHaveBeenCalled();
    expect(spyOnEntityManagerFindOne).toHaveBeenCalledWith(Game, { where: { id: id+1 }, relations: ['genres', 'platforms'] });
    expect(spyOnEntityManagerFindBy).not.toHaveBeenCalled();
    expect(spyOnEntityManagerSave).not.toHaveBeenCalled();
  });

  it('should successfully update game details with platforms and genres included', async() => {
    const spyOnEntityManagerFindOne = jest.spyOn(mockedManager, 'findOne');
    const spyOnEntityManagerFindBy = jest.spyOn(mockedManager, 'findBy');
    const spyOnEntityManagerSave = jest.spyOn(mockedManager, 'save');
    const [genreIds, platformIds] = [[1,2,3],[2,1,5]];
    const [updatedGenreIds, updatedPlatformIds] = [[4,5],[3,4,5]];
  
    const { id } = await service.create({ ...mockGame, genreIds, platformIds });
    const updatedGame = await service.update(id, { name: "Updated Game", genreIds: updatedGenreIds, platformIds: updatedPlatformIds })

    const isGenresUpdated = updatedGame.genres.every((_genre) => updatedGenreIds.includes(_genre.id));
    const isPlatformUpdated = updatedGame.platforms.every((_platform) => updatedPlatformIds.includes(_platform.id));
    
    expect(id).toBeDefined();
    expect(spyOnEntityManagerFindOne).toHaveBeenCalled();
    expect(spyOnEntityManagerFindOne).toHaveBeenCalledWith(Game, { where: { id }, relations: ['genres', 'platforms'] });
    expect(spyOnEntityManagerFindBy).toHaveBeenCalledTimes(2);
    expect(spyOnEntityManagerSave).toHaveBeenCalled();
    expect(updatedGame.id).toEqual(id);
    expect(updatedGame.name).toEqual("Updated Game");
    expect(updatedGame.genres).toHaveLength(updatedGenreIds.length);
    expect(updatedGame.platforms).toHaveLength(updatedPlatformIds.length);
    expect(isGenresUpdated).toBe(true);
    expect(isPlatformUpdated).toBe(true);
  });

  it('should successfully delete a game', async() => {
    const spyOnGameFindOne = jest.spyOn(repository, 'findOne');
    const spyOnGameRemove = jest.spyOn(repository, 'remove');
    const [genreIds, platformIds] = [[1,2,3],[2,1,5]];

    const { id, ...rest } = await service.create({ ...mockGame, genreIds, platformIds });
    await service.delete(id);
    
    expect(id).toBeDefined();
    expect(rest).toBeDefined();
    expect(games).toHaveLength(0);
    expect(spyOnGameFindOne).toHaveBeenCalledWith({ where: { id } }) 
    expect(spyOnGameRemove).toHaveBeenCalledWith({ id, ...rest });
  });

  it('should throw a NotFoundExcetion when provided non-existing game\'s id', async() => {
    const spyOnGameFindOne = jest.spyOn(repository, 'findOne');
    const spyOnGameRemove = jest.spyOn(repository, 'remove');
    const [genreIds, platformIds] = [[1,2,3],[2,1,5]];

    const { id, ...rest } = await service.create({ ...mockGame, genreIds, platformIds });
    await expect(service.delete(id+1)).rejects.toThrow(NotFoundException);
    
    expect(id).toBeDefined();
    expect(rest).toBeDefined();
    expect(games).toHaveLength(1);
    expect(spyOnGameFindOne).toHaveBeenCalledWith({ where: { id: id+1 } });
    expect(spyOnGameRemove).not.toHaveBeenCalled();
  });
});
