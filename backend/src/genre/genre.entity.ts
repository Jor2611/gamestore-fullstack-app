import { Game } from '../game/game.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Genre{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  value: string;

  @Column()
  icon: string;

  @ManyToMany(() => Game, game => game.genres, { cascade: ['remove'] })
  games: Game[];
}