import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { PlatformModule } from '../platform/platform.module';
import { GenreModule } from '../genre/genre.module';


@Module({
  imports:[
    TypeOrmModule.forFeature([Game]),
    PlatformModule,
    GenreModule
  ],
  providers: [GameService],
  controllers: [GameController],
  exports: [TypeOrmModule]
})
export class GameModule {}