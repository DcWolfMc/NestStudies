import { Injectable } from '@nestjs/common';
import { GetCategoryDto } from './dto/get-category.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    const {title} = createCategoryDto
    return await this.databaseService.category.create({
      data: {title:title.toLowerCase()},
    });
  }

  async find(query: GetCategoryDto) {
    const { categories, products } = query;
    let categoryIds = []
  
    
    if(categories)
      categoryIds = categories.split(',').map((id) => parseInt(id, 10));
    // const whereClause = categoryIds.length > 0 ? { id: { in: categoryIds } } : {};
    
    if (!categoryIds.length) {
      return await this.databaseService.category.findMany({
        include: { products: products || false },
      });
    }

    return await this.databaseService.category.findMany({
      where: { id: { in: categoryIds } },
      include: { products: products || false },
    });
  }
}
