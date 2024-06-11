import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';
import { mockGenres } from '../../test/mocks';

let genres: Genre[] = [];
let mockedGenreList: Genre[] = []; 

describe('GenreService', () => {
  let service: GenreService;
  let repository: Repository<Genre>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreService,
        {
          provide: getRepositoryToken(Genre),
          useValue: {
            find: jest.fn().mockReturnValue(mockedGenreList)
          }
        }
      ],
    }).compile();

    mockedGenreList = mockGenres as Genre[];
    service = module.get<GenreService>(GenreService);
    repository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  afterEach(() => {
    genres = [];
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all genres', async() => {
    const spyOnGenreFind = jest.spyOn(repository, 'find');

    const fetchedGenres = await service.find();

    expect(spyOnGenreFind).toHaveBeenCalled();
    expect(fetchedGenres).toBeInstanceOf(Array);
    expect(fetchedGenres).toHaveLength(mockedGenreList.length);
  });
});
