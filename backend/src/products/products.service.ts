import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductFormDto } from './dtos/product-form.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  throwNotFoundError(id: number): void {
    throw new NotFoundException(`Item com ID ${id} não encontrado no estoque`);
  }

  async create(productFormDto: ProductFormDto): Promise<Product> {
    try {
      const newItem = this.productsRepository.create(productFormDto);

      await this.productsRepository.save(newItem);

      return newItem;
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Item com código ${productFormDto.code} já existe no estoque`,
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    const items = await this.productsRepository.find({
      order: { productName: 'ASC' },
    });

    return items;
  }

  async findOne(id: number): Promise<Product> {
    const item = await this.productsRepository.findOneBy({ id });

    if (!item) this.throwNotFoundError(id);

    return item!;
  }

  async update(id: number, productFormDto: ProductFormDto): Promise<Product> {
    try {
      const updatedItem = await this.productsRepository.preload({
        id,
        ...productFormDto,
      });

      if (!updatedItem) this.throwNotFoundError(id);

      return await this.productsRepository.save(updatedItem!);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Item com código ${productFormDto.code} já existe no estoque`,
        );
      }

      throw error;
    }
  }

  async remove(id: number): Promise<Product> {
    const item = await this.productsRepository.findOneBy({ id });

    if (!item) this.throwNotFoundError(id);

    await this.productsRepository.softDelete(item!.id);

    return item!;
  }
}
