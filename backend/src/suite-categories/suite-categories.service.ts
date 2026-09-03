import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryFormDto } from './dtos/category-form.dto';
import { SuiteCategory } from './entities/suite-category.entity';

@Injectable()
export class SuiteCategoriesService {
  constructor(
    @InjectRepository(SuiteCategory)
    private readonly stocksRepository: Repository<SuiteCategory>,
  ) {}

  throwNotFoundError(id: number): void {
    throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
  }

  async create(CategoryFormDto: CategoryFormDto): Promise<CategoryFormDto> {
    try {
      const newCategorie = this.stocksRepository.create(CategoryFormDto);

      await this.stocksRepository.save(newCategorie);

      return newCategorie;
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Categoria com nome ${CategoryFormDto.name} já existe`,
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<SuiteCategory[]> {
    const categories = await this.stocksRepository.find({
      order: { name: 'ASC' },
    });

    return categories;
  }

  async findOne(id: number): Promise<SuiteCategory> {
    const categorie = await this.stocksRepository.findOneBy({ id });

    if (!categorie) this.throwNotFoundError(id);

    return categorie!;
  }

  async update(
    id: number,
    CategoryFormDto: CategoryFormDto,
  ): Promise<SuiteCategory> {
    try {
      const updatedCategorie = await this.stocksRepository.preload({
        id,
        ...CategoryFormDto,
      });

      if (!updatedCategorie) this.throwNotFoundError(id);

      return await this.stocksRepository.save(updatedCategorie!);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Categoria com nome ${CategoryFormDto.name} já existe`,
        );
      }

      throw error;
    }
  }

  async remove(id: number): Promise<SuiteCategory> {
    const categorie = await this.stocksRepository.findOneBy({ id });

    if (!categorie) this.throwNotFoundError(id);

    await this.stocksRepository.softDelete(categorie!.id);

    return categorie!;
  }
}
