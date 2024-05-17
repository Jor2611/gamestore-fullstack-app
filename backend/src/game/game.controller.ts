import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dtos/create-game.dto';
import { ACL } from '../decorators/acl.decorator';
import { UpdateGameDto } from './dtos/update-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService){}

  @Get('')
  async list(@Query('page', new ParseIntPipe()) page: number, @Query('size', new ParseIntPipe()) size: number){
    const filter = {
      page: page || 1,
      size: size || 10,
    };
    const result = await this.gameService.list(filter);
    return { msg: 'GAMES_FETCHED', data: result };
  }

  @Get(':id')
  async read(@Param('id', new ParseIntPipe()) id:number){
    const result = await this.gameService.findOne(id);
    return { msg: 'GAME_FETCHED', data: result };
  }

  @Post('')
  @ACL('game','create')
  async create(@Body() body: CreateGameDto){
    const result = await this.gameService.create(body);
    return { msg: 'GAME_CREATED', data: result };
  }

  @Patch(':id')
  @ACL('game','update')
  async update(@Param('id', new ParseIntPipe()) id:number, @Body() body: UpdateGameDto){
    const result = await this.gameService.update(id,body);
    return { msg: 'GAME_UPDATED', data: result };
  }

  @Delete(':id')
  @HttpCode(204)
  @ACL('game', 'delete')
  async remove(@Param('id', new ParseIntPipe()) id: number){
    const result = await this.gameService.delete(id);
    return { msg: 'GAME_REMOVED', data: result };
  }
}
