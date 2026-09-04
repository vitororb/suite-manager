import { IsEnum, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { SuiteCategory } from '../../suite-categories/entities/suite-category.entity';

export class SuiteFormDto {
  @IsNotEmpty({ message: 'Número da suíte é obrigatório' })
  @IsNumber()
  @Min(0, { message: 'Número da suíte não pode ser negativo' })
  @Max(100, { message: 'Número da suíte inválido' })
  number!: number;

  @IsNotEmpty()
  @IsEnum(SuiteCategory, { message: 'Categoria inválida' })
  category!: SuiteCategory;
}
