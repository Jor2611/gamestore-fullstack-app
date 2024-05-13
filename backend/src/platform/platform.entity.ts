import { Game } from '../game/game.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Platform{
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

  @ManyToMany(() => Game, game => game.platforms, { cascade: ['remove'] })
  games: Game[];
}