import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Repository, In, EntityManager, QueryFailedError } from 'typeorm';
import { CreateGameDto } from './dtos/create-game.dto';
import { Genre } from '../genre/genre.entity';
import { Platform } from '../platform/platform.entity';
import { UpdateGameDto } from './dtos/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly repository: Repository<Game>,
    @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Platform) private readonly platformRepository: Repository<Platform>
  ){}

  async findOne(id: number){
    return this.repository.findOne({ where: { id }, relations: ['platforms', 'genres'] });
  }

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

  async list({ page, size }){
    page =  page > 0 ? page : 1;
    size = size > 0 ? size : 10;

    const skip = (page - 1) * size;
    const queryBuilder = this.repository.createQueryBuilder('game')
    .leftJoinAndSelect('game.platforms', 'platform')
    .leftJoinAndSelect('game.genres', 'genre')
    // .orderBy('orders.created_at', 'DESC')
    .skip(skip)
    .take(size);


    const games = await queryBuilder.getMany();
    const count = await queryBuilder.getCount();
  
    return { games, count };
  }

  async update(id: number, data: UpdateGameDto){
    return await this.repository.manager.transaction(async (manager: EntityManager) => {
      const game = await manager.findOne(Game, { where: { id }, relations: ['genres', 'platforms'] });

      if (!game) {
        throw new NotFoundException("GAME_DOESN'T_EXIST");
      }
      
      Object.assign(game, data);

      if (data.genreIds) {
        const genres = await manager.findBy(Genre, { id: In(data.genreIds) });
        game.genres = genres;
      }
      
      if (data.platformIds) {
        const platforms = await manager.findBy(Platform, { id: In(data.platformIds) });
        game.platforms = platforms;
      }
      
      return await manager.save(Game, game);
    }).catch(err => {
      console.log(err);

      if(err instanceof QueryFailedError && err.driverError && err.driverError.code === '55P03'){
        throw new InternalServerErrorException('ROW_LOCKED_TOO_LONG')
      } else if(err instanceof InternalServerErrorException){
        throw new InternalServerErrorException('SERVER_ERROR')
      }

      throw err;
    });
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
