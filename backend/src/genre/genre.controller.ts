import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService){}

  @Get('')
  async fetch(){
    const result = await this.genreService.find();
    return { success: true, msg: 'GENRES_FETCHED', data: result };
  }
}