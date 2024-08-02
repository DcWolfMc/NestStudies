import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsInt,
  IsObject,
  IsNotEmptyObject,
  IsDefined,
} from 'class-validator';

class DimensionsDto {
  @IsNumber()
  width: number;
  @IsNumber()
  height: number;
  @IsNumber()
  depth: number;
}

export class CreateProductDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  categoryTitle: string;

  @IsDefined()
  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsDefined()
  @IsInt()
  @IsNotEmpty()
  discountPercentage: number;
  
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  @IsOptional()
  brand: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Type(() => DimensionsDto)
  dimensions: DimensionsDto;
}
