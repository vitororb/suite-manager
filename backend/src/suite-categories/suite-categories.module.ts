import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuiteCategorie } from './entities/suite-categorie.entity';
import { SuiteCategoriesController } from './suite-categories.controller';
import { SuiteCategoriesService } from './suite-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuiteCategorie])],
  controllers: [SuiteCategoriesController],
  providers: [SuiteCategoriesService],
  exports: [SuiteCategoriesService],
})
export class SuiteCategoriesModule {}
