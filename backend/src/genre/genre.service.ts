import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';


@Injectable()
export class GenreService {
  constructor(@InjectRepository(Genre) private readonly repo: Repository<Genre>){}

  find(){
    return this.repo.find();
  }
}
