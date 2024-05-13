import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dtos/create-game.dto';
import { ACL } from '../decorators/acl.decorator';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService){}

  @Get('/')
  async list(){
    const result = await this.gameService.list();
    return { msg: 'GAMES_FETCHED', data: result };
  }

  @Post('/')
  @ACL('game','create')
  async create(@Body() body: CreateGameDto){
    const result = await this.gameService.create(body);
    return { msg: 'GAME_CREATED', data: result };
  }

  @Delete('/:id')
  @HttpCode(204)
  @ACL('game', 'delete')
  async remove(@Param('id', new ParseIntPipe()) id: number){
    const result = await this.gameService.delete(id);
    return { msg: 'GAME_REMOVED', data: result };
  }
}
