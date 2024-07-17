import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  ParseBoolPipe
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { Prisma } from '@prisma/client';
import { query } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body(ValidationPipe) createCategoryDto: Prisma.CategoryCreateInput) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  find(@Query(ValidationPipe) query) {
    return this.categoriesService.find(query);
  }
}
