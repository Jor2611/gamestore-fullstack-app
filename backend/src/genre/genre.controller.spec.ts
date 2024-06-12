import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';
import { mockGenres } from '../../test/mocks';

let genres: Genre[] = [];

describe('GenreController', () => {
  let controller: GenreController;
  let service: GenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
      providers: [
        {
          provide: GenreService,
          useValue: {
            find: jest.fn().mockImplementation(() => genres)
          }
        }
      ]
    }).compile();

    controller = module.get<GenreController>(GenreController);
    service = module.get<GenreService>(GenreService);
  });

  afterEach(() => {
    genres = [];
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all genres', async() => {
    const spyOnGenresFind = jest.spyOn(service, 'find');
    genres = mockGenres as Genre[];

    const result = await controller.fetch();

    expect(result).toHaveLength(genres.length);
    expect(spyOnGenresFind).toHaveBeenCalledTimes(1);
  })
});
