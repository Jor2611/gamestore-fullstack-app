import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Platform } from '../platform/platform.entity';
import { Genre } from '../genre/genre.entity';

@Entity()
export class Game{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  publisher: string;

  @Column()
  released: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @Column()
  background_image: string;

  @Column({ nullable: true })
  clip: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  rating: number;

  @Column()
  metacritic: number;

  @Column({ type: 'json' })
  gallery: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Genre, genre => genre.games, { onDelete: 'CASCADE' })
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Platform, platform => platform.games, { onDelete: 'CASCADE' })
  @JoinTable()
  platforms: Platform[];
}