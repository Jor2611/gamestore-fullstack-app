import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';
import { mockGenres } from '../../test/mocks/helpers';
import { RepositoryMock } from '../../test/mocks/RepositoryBuilder';


describe('GenreService', () => {
  let service: GenreService;
  let repository: Repository<Genre>;
  const repositoryMock = new RepositoryMock<Genre>(Genre).build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreService,
        {
          provide: getRepositoryToken(Genre),
          useValue: repositoryMock
        }
      ],
    }).compile();

    repositoryMock.seedCollections({ genres: mockGenres });
    service = module.get<GenreService>(GenreService);
    repository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  afterEach(() => {
    jest.clearAllMocks();
    repositoryMock.resetData();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all genres', async() => {
    const spyOnGenreFind = jest.spyOn(repository, 'find');

    const fetchedGenres = await service.find();
    const collection = await repositoryMock.collection();

    expect(spyOnGenreFind).toHaveBeenCalled();
    expect(fetchedGenres).toBeInstanceOf(Array);
    expect(fetchedGenres).toHaveLength(collection.length);
  });
});
