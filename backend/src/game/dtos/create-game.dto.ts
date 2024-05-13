import { IsNotEmpty, IsArray, IsOptional, Max, Min, MinLength, MaxLength, IsNumber, ArrayMinSize } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  publisher: string;

  @IsNotEmpty()
  released: string;

  @IsNotEmpty()
  @MinLength(50)
  @MaxLength(700)
  description: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  background_image: string;

  @IsOptional()
  clip: string;

  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;
  
  @Min(0)
  @Max(100)
  @IsNumber()
  metacritic: number;

  @IsNotEmpty()
  @IsArray()
  gallery: string[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  genreIds: number[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  platformIds: number[];
}
