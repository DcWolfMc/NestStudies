import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
export class GetProductDto {
  @IsString()
  @IsOptional()
  category: string;
  
  @IsNumber()
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  brands: string;
  
  @IsNumber()
  @IsOptional()
  minPrice: number;
  
  @IsNumber()
  @IsOptional()
  maxPrice: number;
  
  @IsOptional()
  @IsEnum(['lowest-price', 'highest-price', 'A-Z', 'Z-A'], {
    message: ' Valid sort name is required',
  })
  sortByname: 'lowest-price' | 'highest-price' | 'A-Z' | 'Z-A';
}
