import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { GetProductDto } from './dto/get-product.dto';
import { array } from 'zod';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    // category = await this.categoryService.findByNameDcreateProductDto.category;
    return await this.databaseService.$transaction(async (prisma) => {
      return prisma.product.create({ data: createProductDto });
    });
  }

  async getProducts(query: GetProductDto) {
    console.log('getProducts!!');
    let { brands, category, maxPrice, minPrice, rating, sortByname } = query;
    Object.entries(query).map((value, index, array) => {
      console.log('value: ', value, ' index: ', index, ' array: ', array);
    });
    return await this.databaseService.product.findMany({})
  }
}
