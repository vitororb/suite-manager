import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategorieFormDto } from './dtos/categorie-form.dto';
import { SuiteCategorie } from './entities/suite-categorie.entity';

@Injectable()
export class SuiteCategoriesService {
  constructor(
    @InjectRepository(SuiteCategorie)
    private readonly stocksRepository: Repository<SuiteCategorie>,
  ) {}

  throwNotFoundError(id: number): void {
    throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
  }

  async create(categorieFormDto: CategorieFormDto): Promise<CategorieFormDto> {
    try {
      const newCategorie = this.stocksRepository.create(categorieFormDto);

      await this.stocksRepository.save(newCategorie);

      return newCategorie;
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Categoria com nome ${categorieFormDto.name} já existe`,
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<SuiteCategorie[]> {
    const categories = await this.stocksRepository.find({
      order: { name: 'ASC' },
    });

    return categories;
  }

  async findOne(id: number): Promise<SuiteCategorie> {
    const categorie = await this.stocksRepository.findOneBy({ id });

    if (!categorie) this.throwNotFoundError(id);

    return categorie!;
  }

  async update(
    id: number,
    categorieFormDto: CategorieFormDto,
  ): Promise<SuiteCategorie> {
    try {
      const updatedCategorie = await this.stocksRepository.preload({
        id,
        ...categorieFormDto,
      });

      if (!updatedCategorie) this.throwNotFoundError(id);

      return await this.stocksRepository.save(updatedCategorie!);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Categoria com nome ${categorieFormDto.name} já existe`,
        );
      }

      throw error;
    }
  }

  async remove(id: number): Promise<SuiteCategorie> {
    const categorie = await this.stocksRepository.findOneBy({ id });

    if (!categorie) this.throwNotFoundError(id);

    await this.stocksRepository.softDelete(categorie!.id);

    return categorie!;
  }
}
