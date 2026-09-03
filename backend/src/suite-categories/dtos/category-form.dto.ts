import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CategoryFormDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  @Length(1, 100, { message: 'Nome deve ter entre 1 e 100 caracteres' })
  name!: string;

  @IsNotEmpty({ message: 'Preço é obrigatório' })
  @IsNumber()
  @Min(0, { message: 'Preço não pode ser negativo' })
  @Max(99999.99, { message: 'Preço inválido' })
  basePrice!: number;
}
