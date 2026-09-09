import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ProductTypeFormDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  @Length(1, 100, { message: 'Nome deve ter entre 1 e 100 caracteres' })
  name!: string;
}
