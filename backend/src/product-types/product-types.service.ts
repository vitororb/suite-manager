import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { ProductTypeFormDto } from './dtos/product-type-form.dto';
import { ProductType } from './entities/product-type.entity';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productTypesRepository: Repository<ProductType>,
  ) {}

  throwNotFoundError(id: number): void {
    throw new NotFoundException(`Tipo de Produto com ID ${id} não encontrado`);
  }

  async create(productTypeFormDto: ProductTypeFormDto): Promise<ProductType> {
    try {
      const newProductType =
        this.productTypesRepository.create(productTypeFormDto);

      await this.productTypesRepository.save(newProductType);

      return newProductType;
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Tipo de Produto com nome ${productTypeFormDto.name} já existe`,
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<ProductType[]> {
    const productTypes = await this.productTypesRepository.find({
      order: { name: 'ASC' },
    });

    return productTypes;
  }

  async findOne(id: number): Promise<ProductType> {
    const productType = await this.productTypesRepository.findOneBy({ id });

    if (!productType) this.throwNotFoundError(id);

    return productType!;
  }

  async update(
    id: number,
    productTypeFormDto: ProductTypeFormDto,
  ): Promise<ProductType> {
    try {
      const updatedProductType = await this.productTypesRepository.preload({
        id,
        ...productTypeFormDto,
      });

      if (!updatedProductType) this.throwNotFoundError(id);

      return await this.productTypesRepository.save(updatedProductType!);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Tipo de Produto com nome ${productTypeFormDto.name} já existe`,
        );
      }

      throw error;
    }
  }

  async remove(id: number): Promise<ProductType> {
    const productType = await this.productTypesRepository.findOneBy({ id });

    if (!productType) this.throwNotFoundError(id);

    await this.productTypesRepository.softRemove(productType!);

    return productType!;
  }
}
