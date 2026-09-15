import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserProfiles } from '../enums/user-profiles.enum';

export class UserFormDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  @MinLength(11)
  @MaxLength(11)
  cpf!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  password!: string;

  @IsNotEmpty()
  @IsEnum(UserProfiles, { message: 'Perfil inválido' })
  profile!: UserProfiles;
}
