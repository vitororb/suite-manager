import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateAlertDto } from './dtos/update-alert.dto';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { Suite } from './entities/suite.entity';
import { SuitesService } from './suites.service';

@Controller('suites')
export class SuitesController {
  constructor(private readonly suitesService: SuitesService) {}

  @Get()
  findAll(): Promise<Suite[]> {
    return this.suitesService.findAll();
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Suite> {
    return this.suitesService.updateStatus(+id, updateStatusDto);
  }

  @Patch(':id')
  updateAlert(
    @Param('id') id: string,
    @Body() updateAlertDto: UpdateAlertDto,
  ): Promise<Suite> {
    return this.suitesService.updateAlert(+id, updateAlertDto);
  }
}
