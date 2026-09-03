import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryFormDto } from './dtos/category-form.dto';
import { SuiteCategory } from './entities/suite-category.entity';
import { SuiteCategoriesService } from './suite-categories.service';

@Controller('suite-categories')
export class SuiteCategoriesController {
  constructor(
    private readonly suiteCategoriesService: SuiteCategoriesService,
  ) {}

  @Post()
  create(@Body() categoryFormDto: CategoryFormDto): Promise<CategoryFormDto> {
    return this.suiteCategoriesService.create(categoryFormDto);
  }

  @Get()
  findAll(): Promise<SuiteCategory[]> {
    return this.suiteCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SuiteCategory> {
    return this.suiteCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() categoryFormDto: CategoryFormDto,
  ): Promise<SuiteCategory> {
    return this.suiteCategoriesService.update(+id, categoryFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.suiteCategoriesService.remove(+id);
  }
}
