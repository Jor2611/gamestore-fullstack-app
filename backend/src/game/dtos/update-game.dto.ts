import { IsNotEmpty, IsArray, IsOptional, Max, Min, MinLength, MaxLength, IsNumber, ArrayMinSize, IsString } from 'class-validator';

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  publisher: string;

  @IsString()
  @IsOptional()
  released: string;

  @IsString()
  @MinLength(50)
  @MaxLength(700)
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsOptional()
  background_image: string;

  @IsOptional()
  clip: string;

  @Min(1)
  @Max(5)
  @IsNumber()
  @IsOptional()
  rating: number;
  
  @Min(0)
  @Max(100)
  @IsNumber()
  @IsOptional()
  metacritic: number;

  @IsArray()
  @IsOptional()
  gallery: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  genreIds: number[];

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  platformIds: number[];
}
