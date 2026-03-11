import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suite } from './entities/suite.entity';

@Injectable()
export class SuitesService {
  constructor(
    @InjectRepository(Suite)
    private readonly suiteRepository: Repository<Suite>,
  ) {}

  @Get()
  async findAll(): Promise<Suite[]> {
    const suites = await this.suiteRepository.find();

    return suites;
  }

  // @Patch()
  // updateStatus(id: number): string {
  //   return '';
  // }
}
