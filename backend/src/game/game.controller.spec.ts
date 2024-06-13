import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from './game.entity';
import { mockGames, mockGenres, mockPlatforms } from '../../test/mocks';
import { CreateGameDto } from './dtos/create-game.dto';
import { Genre } from '../genre/genre.entity';
import { Platform } from '../platform/platform.entity';
import { UpdateGameDto } from './dtos/update-game.dto';
import { NotFoundException } from '@nestjs/common';

const mockedGameData = mockGames(mockGenres, mockPlatforms, 1)[0];

describe('GameController', () => {
  let controller: GameController;
  let service: GameService;
  let games: Game[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        {
          provide: GameService,
          useValue: {
            list: jest.fn().mockImplementation(async(filter: { page: number , size: number }): Promise<{ games: Game[], count: number }> => {
              const skip = (filter.page - 1) * filter.size;
              const pageData = games.slice(skip, skip + filter.size); 
              return { games: pageData, count: games.length };
            }),
            findOne: jest.fn().mockImplementation(async(id: number): Promise<Game | null> => {
              const game = games.find((_game) => _game.id === id) || null;
    
              if(!game) {
                throw new NotFoundException("GAME_DOESN'T_EXIST");
              }
          
              return game;
            }),
            create: jest.fn().mockImplementation(async(data: CreateGameDto): Promise<Game> => {
              const platforms = mockPlatforms.filter((_platform) => data.platformIds.includes(_platform.id)) as Platform[];
              const genres = mockGenres.filter((_genre) => data.genreIds.includes(_genre.id)) as Genre[];
              const processDate = new Date();
              delete data.genreIds;
              delete data.platformIds;
              const newGame = { 
                id: Math.floor(Math.random() * 1000), 
                platforms, 
                genres, 
                createdAt: processDate, 
                updatedAt: processDate,
                ...data
              };
              games.push(newGame);
              return newGame;
            }),
            update: jest.fn().mockImplementation(async(id: number, data: Partial<UpdateGameDto>): Promise<Game> => {
              const game = games.find((_game) => _game.id === id);

              if(!game) {
                throw new NotFoundException("GAME_DOESN'T_EXIST");
              }
              
              const processDate = new Date();
              Object.assign(game, { ...data, updatedAt: processDate });
              return game;
            }),
            delete: jest.fn().mockImplementation(async(id: number): Promise<Game> => {
              const game = games.find((_game) => _game.id === id);

              if(!game) {
                throw new NotFoundException("GAME_DOESN'T_EXIST");
              }

              games = games.filter((_game) => _game.id === id);
              return game;
            })
          }
        }
      ]
    }).compile();

    controller = module.get<GameController>(GameController);
    service = module.get<GameService>(GameService)
  });

  afterEach(() => {
    games = [];
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of games filtered by provided page and size', async() => {
    const spyOnGamesList = jest.spyOn(service, 'list');
    games = mockGames(mockGenres, mockPlatforms, 50);

    const { msg, data } = await controller.list(2,15);

    expect(spyOnGamesList).toHaveBeenCalledTimes(1);
    expect(spyOnGamesList).toHaveBeenCalledWith({ page: 2, size: 15 });
    expect(msg).toEqual('GAMES_FETCHED');
    expect(data.games).toHaveLength(15);
    expect(data.count).toEqual(50);
  });

  it('should create a new game, with required data', async() => {
    const spyOnGameCreate = jest.spyOn(service, 'create');
    const { platforms, genres, ...gameData } = mockedGameData;
    const newGameData = { ...gameData, genreIds: [1,2,3], platformIds: [2,3,4] };
    
    const { msg, data } = await controller.create(newGameData);
    
    expect(spyOnGameCreate).toHaveBeenCalledTimes(1);
    expect(spyOnGameCreate).toHaveBeenCalledWith(newGameData);
    expect(msg).toEqual('GAME_CREATED');
    expect(data).toBeDefined();
    expect(data.name).toEqual(gameData.name);
  });

  it('should read a game data by its id', async() => {
    const spyOnGameFindOne = jest.spyOn(service, 'findOne'); 
    const { id, platforms, genres, ...gameData } = mockedGameData;
    const newGameData = { ...gameData, genreIds: [1,2,3], platformIds: [2,3,4] };
    
    const createdGame = await controller.create(newGameData)
    const { msg, data } = await controller.read(createdGame.data.id);

    expect(spyOnGameFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnGameFindOne).toHaveBeenCalledWith(createdGame.data.id);
    expect(msg).toEqual('GAME_FETCHED');
    expect(data).toBeDefined();
    expect(data.id).toEqual(createdGame.data.id);
  });

  it('should update a game with provide id and data', async() => {
    const spyOnGameUpdate = jest.spyOn(service, 'update'); 
    const { id, platforms, genres, ...gameData } = mockedGameData;
    const newGameData = { ...gameData, genreIds: [1,2,3], platformIds: [2,3,4] };
    const toUpdateData = { name: 'Updated Game' } as UpdateGameDto; 
    
    const createdGame = await controller.create(newGameData);
    const { msg, data } = await controller.update(createdGame.data.id, toUpdateData);

    expect(spyOnGameUpdate).toHaveBeenCalledTimes(1);
    expect(spyOnGameUpdate).toHaveBeenCalledWith(createdGame.data.id, toUpdateData);
    expect(msg).toEqual('GAME_UPDATED');
    expect(data).toBeDefined();
    expect(data.id).toEqual(createdGame.data.id);
    expect(data.name).toEqual(toUpdateData.name);
  });

  it('should delete a game with provided id', async() =>{
    const spyOnGameDelete = jest.spyOn(service, 'delete'); 
    const { id, platforms, genres, ...gameData } = mockedGameData;
    const newGameData = { ...gameData, genreIds: [1,2,3], platformIds: [2,3,4] };
    
    const createdGame = await controller.create(newGameData);
    await controller.remove(createdGame.data.id);

    expect(spyOnGameDelete).toHaveBeenCalledTimes(1);
    expect(spyOnGameDelete).toHaveBeenCalledWith(createdGame.data.id);
  });
});
