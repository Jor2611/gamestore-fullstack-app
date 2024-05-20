import { Expose } from 'class-transformer';
import { Genre } from '../../genre/genre.entity';
import { Platform } from '../../platform/platform.entity';

export class GameResponseDto{
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  publisher: string;

  @Expose()
  released: string;

  @Expose()
  description: string;

  @Expose()
  slug: string;

  @Expose()
  background_image: string;

  @Expose()
  clip: string | null;

  @Expose()
  rating: number;

  @Expose()
  metacritic: number;

  @Expose()
  gallery: string[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  genres: Genre[];

  @Expose()
  platforms: Platform[];
}