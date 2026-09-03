import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuiteCategory } from './entities/suite-category.entity';
import { SuiteCategoriesController } from './suite-categories.controller';
import { SuiteCategoriesService } from './suite-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuiteCategory])],
  controllers: [SuiteCategoriesController],
  providers: [SuiteCategoriesService],
  exports: [SuiteCategoriesService],
})
export class SuiteCategoriesModule {}
