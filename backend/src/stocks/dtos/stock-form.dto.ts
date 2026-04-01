import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class StockFormDto {
  @IsNotEmpty({ message: 'Código é obrigatório' })
  @IsString()
  @Length(1, 50, { message: 'Código deve ter entre 1 e 50 caracteres' })
  code: string;

  @IsNotEmpty({ message: 'Nome do produto é obrigatório' })
  @IsString()
  @Length(1, 150, { message: 'Nome deve ter entre 1 e 150 caracteres' })
  productName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  brand: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 80)
  productType: string;

  @IsNotEmpty({ message: 'Quantidade é obrigatória' })
  @IsNumber()
  @Min(0, { message: 'Quantidade não pode ser negativa' })
  quantity: number;

  @IsNotEmpty({ message: 'Preço de custo é obrigatório' })
  @IsNumber()
  @Min(0, { message: 'Preço de custo não pode ser negativo' })
  @Max(99999.99, { message: 'Preço de custo inválido' })
  costPrice: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  unitType: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumStock?: number;
}
