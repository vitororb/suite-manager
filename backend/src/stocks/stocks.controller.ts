import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StockFormDto } from './dtos/stock-form.dto';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() stockFormDto: StockFormDto) {
    return this.stocksService.create(stockFormDto);
  }

  @Get()
  findAll() {
    return this.stocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() stockFormDto: StockFormDto) {
    return this.stocksService.update(+id, stockFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.stocksService.remove(+id);
  }
}
