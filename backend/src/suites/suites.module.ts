import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suite } from './entities/suite.entity';
import { SuitesController } from './suites.controller';
import { SuitesService } from './suites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Suite])],
  controllers: [SuitesController],
  providers: [SuitesService],
  exports: [SuitesService],
})
export class SuitesModule {}
