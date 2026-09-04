import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SuiteFormDto } from './dtos/suite-form.dto';
import { UpdateAlertDto } from './dtos/update-alert.dto';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { Suite } from './entities/suite.entity';
import { SuitesService } from './suites.service';

@Controller('suites')
export class SuitesController {
  constructor(private readonly suitesService: SuitesService) {}

  @Post()
  create(@Body() suiteFormDto: SuiteFormDto): Promise<Suite> {
    return this.suitesService.create(suiteFormDto);
  }

  @Get()
  findAll(): Promise<Suite[]> {
    return this.suitesService.findAll();
  }

  @Patch(':id')
  updateSuite(
    @Param('id') id: number,
    @Body() suiteFormDto: SuiteFormDto,
  ): Promise<Suite> {
    return this.suitesService.updateSuite(id, suiteFormDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Suite> {
    return this.suitesService.updateStatus(+id, updateStatusDto);
  }

  @Patch(':id/alert')
  updateAlert(
    @Param('id') id: string,
    @Body() updateAlertDto: UpdateAlertDto,
  ): Promise<Suite> {
    return this.suitesService.updateAlert(+id, updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Suite> {
    return this.suitesService.remove(id);
  }
}
