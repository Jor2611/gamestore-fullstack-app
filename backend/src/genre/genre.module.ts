import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([Genre]),
  ],
  providers: [GenreService],
  controllers: [GenreController],
  exports: [TypeOrmModule]
})
export class GenreModule {}
