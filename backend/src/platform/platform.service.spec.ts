import { Test, TestingModule } from '@nestjs/testing';
import { PlatformService } from './platform.service';
import { Repository } from 'typeorm';
import { Platform } from './platform.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlatformService', () => {
  let service: PlatformService;
  let repository: Repository<Platform>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlatformService,
        {
          provide: getRepositoryToken(Platform),
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<PlatformService>(PlatformService);
    repository = module.get<Repository<Platform>>(getRepositoryToken(Platform));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
