import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductTypeFormDto } from './dtos/product-type-form.dto';
import { ProductType } from './entities/product-type.entity';
import { ProductTypesService } from './product-types.service';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Post()
  create(@Body() productTypeFormDto: ProductTypeFormDto): Promise<ProductType> {
    return this.productTypesService.create(productTypeFormDto);
  }

  @Get()
  findAll(): Promise<ProductType[]> {
    return this.productTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProductType> {
    return this.productTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() productTypeFormDto: ProductTypeFormDto,
  ): Promise<ProductType> {
    return this.productTypesService.update(+id, productTypeFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<ProductType> {
    return this.productTypesService.remove(+id);
  }
}
