import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockFormDto } from './dtos/stock-form.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private readonly stocksRepository: Repository<Stock>,
  ) {}

  throwNotFoundError(id: number): void {
    throw new NotFoundException(`Item com ID ${id} não encontrado no estoque`);
  }

  async create(stockFormDto: StockFormDto): Promise<Stock> {
    try {
      const newItem = this.stocksRepository.create(stockFormDto);

      await this.stocksRepository.save(newItem);

      return newItem;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Item com código ${stockFormDto.code} já existe no estoque`,
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<Stock[]> {
    const stockItems = await this.stocksRepository.find({
      order: { productName: 'ASC' },
    });

    return stockItems;
  }

  async findOne(id: number): Promise<Stock> {
    const stockItem = await this.stocksRepository.findOneBy({ id });

    if (!stockItem) this.throwNotFoundError(id);

    return stockItem!;
  }

  async update(id: number, stockFormDto: StockFormDto): Promise<Stock> {
    try {
      const updatedItem = await this.stocksRepository.preload({
        id,
        ...stockFormDto,
      });

      if (!updatedItem) this.throwNotFoundError(id);

      return await this.stocksRepository.save(updatedItem!);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Item com código ${stockFormDto.code} já existe no estoque`,
        );
      }

      throw error;
    }
  }

  async remove(id: number): Promise<Stock> {
    const stockItem = await this.stocksRepository.findOneBy({ id });

    if (!stockItem) this.throwNotFoundError(id);

    await this.stocksRepository.softDelete(stockItem!.id);

    return stockItem!;
  }
}
