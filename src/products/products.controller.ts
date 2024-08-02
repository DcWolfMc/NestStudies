import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetProductDto } from './dto/get-product.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    const {
      brand,
      categoryTitle,
      description,
      dimensions,
      discountPercentage,
      price,
      stock,
      tags,
      title,
    } = createProductDto;
    return this.productsService.create({
      title,
      dimensions: JSON.stringify(dimensions),
      description,
      discountPercentage,
      price,
      rating: 5,
      stock,
      brand,
      tags,
      category: {
        connectOrCreate: {
          create: { title: categoryTitle },
          where: { title: categoryTitle },
        },
      },
    });
  }

  @Post('/group')
  createGroupOfProducts() {}

  @Get()
  getProducts(@Query() query: GetProductDto) {
    return this.productsService.getProducts(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return {};
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return {};
  }
  //Would it be interesting to update a group of items instead of just 1?
}
