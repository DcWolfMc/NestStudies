import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  creat() {}
  @Post()
  createGroup() {}
  @Get()
  getProducts(
    @Query('category') category: string[],
    @Query('rating', ParseIntPipe) rating: number[],
    @Query('brands') brands: string[],
    @Query('minPrice', ParseIntPipe) minPrice: number,
    @Query('maxPrice', ParseIntPipe) maxPrice: number,
    @Query('sortBy') sortBy: "price"|"name",
  ) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return {};
  }
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return {};
  }
  //Would it be interesting to update a group of items instead of just 1?
  @Patch(':id')
  updateGroup(@Param('id', ParseIntPipe) id: number) {
    return {};
  }
}
