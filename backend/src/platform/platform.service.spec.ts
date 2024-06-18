import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformService } from './platform.service';
import { Platform } from './platform.entity';
import { mockPlatforms } from '../../test/mocks/helpers';
import { RepositoryMock } from '../../test/mocks/RepositoryBuilder';

describe('PlatformService', () => {
  let service: PlatformService;
  let repository: Repository<Platform>;

  const repositoryMock = new RepositoryMock<Platform>(Platform).build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlatformService,
        {
          provide: getRepositoryToken(Platform),
          useValue: repositoryMock
        }
      ],
    }).compile();

    repositoryMock.seedCollections({ platforms: mockPlatforms });
    service = module.get<PlatformService>(PlatformService);
    repository = module.get<Repository<Platform>>(getRepositoryToken(Platform));
  });

  afterEach(() => {
    jest.clearAllMocks();
    repositoryMock.resetData();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all platforms', async() => {
    const spyOnPlatformFind = jest.spyOn(repository, 'find');

    const fetchedPlatforms = await service.find();
    const collection = await repositoryMock.collection();

    expect(spyOnPlatformFind).toHaveBeenCalled();
    expect(fetchedPlatforms).toBeInstanceOf(Array);
    expect(fetchedPlatforms).toHaveLength(collection.length);
  });
});
