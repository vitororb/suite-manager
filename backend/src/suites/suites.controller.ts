import { Controller, Get } from '@nestjs/common';
import { Suite } from './entities/suite.entity';
import { SuitesService } from './suites.service';

@Controller('suites')
export class SuitesController {
  constructor(private readonly suitesService: SuitesService) {}

  @Get()
  findAll(): Promise<Suite[]> {
    return this.suitesService.findAll();
  }

  // @Patch(':id')
  // updateStatus(@Param('id') id: number): string {
  //   return this.suitesService.updateStatus(id);
  // }
}
