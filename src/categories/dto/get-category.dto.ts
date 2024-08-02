import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class GetCategoryDto {
  @IsOptional()
  @Transform(({value}) => value ==="true" || value === true || value === 1 || value ==="1")
  @IsBoolean()
  products?: boolean;

  @IsOptional()
  @IsString()
  categories?: string;
}
