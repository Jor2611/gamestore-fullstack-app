import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Platform } from './platform.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlatformService {
  constructor(@InjectRepository(Platform) private readonly repo: Repository<Platform>){}

  find(){
    return this.repo.find();
  }
}
