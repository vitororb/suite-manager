import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuiteFormDto } from './dtos/suite-form.dto';
import { UpdateAlertDto } from './dtos/update-alert.dto';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { Suite } from './entities/suite.entity';
import { SuiteStatus } from './enums/suite-status.enum';
import { allowedTransitions } from './rules/status-transitions-rules';

@Injectable()
export class SuitesService {
  constructor(
    @InjectRepository(Suite)
    private readonly suiteRepository: Repository<Suite>,
  ) {}

  throwNotFoundError(id: number): void {
    throw new NotFoundException(`Suite com ID ${id} não encontrada`);
  }

  async create(suiteFormDto: SuiteFormDto): Promise<Suite> {
    try {
      const newSuite = this.suiteRepository.create(suiteFormDto);

      await this.suiteRepository.save(newSuite);

      return newSuite;
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Suite com número ${suiteFormDto.number} já existe`,
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<Suite[]> {
    const suites = await this.suiteRepository.find({
      order: { id: 'ASC' },
    });

    return suites;
  }

  async updateSuite(id: number, suiteFormDto: SuiteFormDto): Promise<Suite> {
    try {
      const updatedSuite = await this.suiteRepository.preload({
        id,
        ...suiteFormDto,
      });

      if (!updatedSuite) this.throwNotFoundError(id);

      return await this.suiteRepository.save(updatedSuite!);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Suite com número ${suiteFormDto.number} já existe`,
        );
      }

      throw error;
    }
  }

  async updateStatus(
    id: number,
    updateStatusDto: UpdateStatusDto,
  ): Promise<Suite> {
    const suite = await this.suiteRepository.findOne({ where: { id } });
    const isCheckingOut =
      suite?.status === SuiteStatus.LOCADO &&
      updateStatusDto.status !== SuiteStatus.LOCADO;
    const isCheckingIn = updateStatusDto.status === SuiteStatus.LOCADO;

    if (!suite) this.throwNotFoundError(id);

    if (!allowedTransitions[suite!.status].includes(updateStatusDto.status)) {
      throw new Error('Transição de status não permitida');
    }

    if (isCheckingOut) {
      suite.checkOut = new Date();
      suite.checkIn = null;
    }

    if (isCheckingIn) suite!.checkIn = new Date();

    suite!.status = updateStatusDto.status;

    return this.suiteRepository.save(suite!);
  }

  async updateAlert(
    id: number,
    updateAlertDto: UpdateAlertDto,
  ): Promise<Suite> {
    const suite = await this.suiteRepository.findOne({ where: { id } });

    if (!suite) this.throwNotFoundError(id);

    suite!.alert = updateAlertDto.alert;

    return this.suiteRepository.save(suite!);
  }

  async remove(id: number): Promise<Suite> {
    const suite = await this.suiteRepository.findOneBy({ id });

    if (!suite) this.throwNotFoundError(id);

    await this.suiteRepository.softDelete(suite!.id);

    return suite!;
  }
}
