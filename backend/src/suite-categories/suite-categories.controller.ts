import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategorieFormDto } from './dtos/categorie-form.dto';
import { SuiteCategorie } from './entities/suite-categorie.entity';
import { SuiteCategoriesService } from './suite-categories.service';

@Controller('suite-categories')
export class SuiteCategoriesController {
  constructor(
    private readonly suiteCategoriesService: SuiteCategoriesService,
  ) {}

  @Post()
  create(
    @Body() categorieFormDto: CategorieFormDto,
  ): Promise<CategorieFormDto> {
    return this.suiteCategoriesService.create(categorieFormDto);
  }

  @Get()
  findAll(): Promise<SuiteCategorie[]> {
    return this.suiteCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SuiteCategorie> {
    return this.suiteCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() categorieFormDto: CategorieFormDto) {
    return this.suiteCategoriesService.update(+id, categorieFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.suiteCategoriesService.remove(+id);
  }
}
