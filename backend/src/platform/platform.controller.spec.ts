import { Test, TestingModule } from '@nestjs/testing';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { Platform } from './platform.entity';
import { mockPlatforms } from '../../test/mocks';

let platforms: Platform[] = [];

describe('PlatformController', () => {
  let controller: PlatformController;
  let service: PlatformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformController],
      providers: [
        {
          provide: PlatformService,
          useValue: {
            find: jest.fn().mockImplementation(() => platforms)
          }
        }
      ]
    }).compile();

    controller = module.get<PlatformController>(PlatformController);
    service = module.get<PlatformService>(PlatformService);
  });

  afterEach(() => {
    platforms = [];
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all platforms', async() => {
    const spyOnPlatformsFind = jest.spyOn(service, 'find');
    platforms = mockPlatforms as Platform[];

    const result = await controller.fetch();

    expect(result).toHaveLength(platforms.length);
    expect(spyOnPlatformsFind).toHaveBeenCalledTimes(1);
  })
});
