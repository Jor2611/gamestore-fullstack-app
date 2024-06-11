import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('GenreService', () => {
  let service: GenreService;
  let repository: Repository<Genre>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreService,
        {
          provide: getRepositoryToken(Genre),
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<GenreService>(GenreService);
    repository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
