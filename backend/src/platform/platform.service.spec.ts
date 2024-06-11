import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformService } from './platform.service';
import { Platform } from './platform.entity';
import { mockPlatforms } from '../../test/mocks';

let platforms: Platform[] = [];
let mockedPlatformList: Platform[] = []; 

describe('PlatformService', () => {
  let service: PlatformService;
  let repository: Repository<Platform>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlatformService,
        {
          provide: getRepositoryToken(Platform),
          useValue: {
            find: jest.fn().mockReturnValue(mockedPlatformList)
          }
        }
      ],
    }).compile();

    mockedPlatformList = mockPlatforms as Platform[];
    service = module.get<PlatformService>(PlatformService);
    repository = module.get<Repository<Platform>>(getRepositoryToken(Platform));
  });

  afterEach(() => {
    platforms = [];
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all platforms', async() => {
    const spyOnPlatformFind = jest.spyOn(repository, 'find');

    const fetchedPlatforms = await service.find();

    expect(spyOnPlatformFind).toHaveBeenCalled();
    expect(fetchedPlatforms).toBeInstanceOf(Array);
    expect(fetchedPlatforms).toHaveLength(mockedPlatformList.length);
  });
});
