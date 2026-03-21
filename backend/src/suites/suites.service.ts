import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { Suite } from './entities/suite.entity';
import { SuiteStatus } from './enum/suite-status.enum';

@Injectable()
export class SuitesService {
  constructor(
    @InjectRepository(Suite)
    private readonly suiteRepository: Repository<Suite>,
  ) {}

  throwNotFoundError(id: number): void {
    throw new NotFoundException(`Suite com ID ${id} não encontrada`);
  }

  async findAll(): Promise<Suite[]> {
    const suites = await this.suiteRepository.find({
      order: { id: 'ASC' },
    });

    return suites;
  }

  async updateStatus(
    id: number,
    updateStatusDto: UpdateStatusDto,
  ): Promise<Suite> {
    const suite = await this.suiteRepository.findOne({ where: { id } });
    const isCheckingOut =
      suite?.status === SuiteStatus.locado &&
      updateStatusDto.status !== SuiteStatus.locado;
    const isCheckingIn = updateStatusDto.status === SuiteStatus.locado;

    if (!suite) this.throwNotFoundError(id);

    if (suite!.status === updateStatusDto.status) return suite!;

    if (isCheckingOut) suite.checkOut = new Date();

    if (isCheckingIn) suite!.checkIn = new Date();

    suite!.status = updateStatusDto.status;

    return this.suiteRepository.save(suite!);
  }
}
