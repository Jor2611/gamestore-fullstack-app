import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Repository, In } from 'typeorm';
import { CreateGameDto } from './dtos/create-game.dto';
import { Genre } from '../genre/genre.entity';
import { Platform } from '../platform/platform.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly repository: Repository<Game>,
    @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Platform) private readonly platformRepository: Repository<Platform>
  
  ){}

  async create(data: CreateGameDto){
    try{
      const genreIds = data.genreIds;
      const platformIds = data.platformIds;
      const genres = await this.genreRepository.findBy({ id: In(genreIds) });
      const platforms = await this.platformRepository.findBy({ id: In(platformIds) });
      delete data.genreIds;
      delete data.platformIds;
      const game = this.repository.create({ ...data, genres, platforms });
      return await this.repository.save(game);
    }catch(err){
      console.log(err);
      throw new InternalServerErrorException()
    }
  }

  async list(){
    const res = await this.repository.find({ relations: [ 'platforms', 'genres' ] });
    return res;
  }

  async delete(id: number){
    try{
      const game = await this.repository.findOne({ where: { id } });
      
      if(!game) throw new NotFoundException('');

      return this.repository.remove(game);
    }catch(err){
      console.log(err);

      if(err instanceof InternalServerErrorException){
        throw new InternalServerErrorException('SERVER_ERROR');
      }

      throw err;
    }
  }
}
