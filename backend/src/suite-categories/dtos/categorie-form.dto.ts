import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CategorieFormDto {
  @IsNotEmpty({ message: 'Código é obrigatório' })
  @IsString()
  @Length(1, 100, { message: 'Código deve ter entre 1 e 100 caracteres' })
  name!: string;

  @IsNotEmpty({ message: 'Preço de custo é obrigatório' })
  @IsNumber()
  @Min(0, { message: 'Preço de custo não pode ser negativo' })
  @Max(99999.99, { message: 'Preço de custo inválido' })
  basePrice!: number;
}
