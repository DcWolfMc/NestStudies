import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class GetCategoryDto {
  @IsOptional()
  @IsBoolean()
  products?: boolean;

  @IsOptional()
  @IsString()
  categories?: string;
}
