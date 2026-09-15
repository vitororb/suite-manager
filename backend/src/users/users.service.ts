import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFormDto } from './dtos/user-form.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    // private readonly hashingService: HashingService,
  ) {}

  throwNotFoundError(id: number): void {
    throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
  }

  async create(userFormDto: UserFormDto): Promise<User> {
    try {
      // const passwordHash = await this.hashingService.hash(userFormDto.password);
      const newUser = this.usersRepository.create({
        ...userFormDto,
        // passwordHash,
      });

      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Usuário com o cpf ${userFormDto.cpf} já existe`,
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      order: { name: 'ASC' },
    });

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) this.throwNotFoundError(id);

    return user!;
  }

  // TODO: Implementar a atualização de senha apenas se for o próprio usuário
  async update(id: number, userFormDto: UserFormDto): Promise<User> {
    try {
      const updatedUser = await this.usersRepository.preload({
        id,
        ...userFormDto,
      });

      if (!updatedUser) this.throwNotFoundError(id);

      return await this.usersRepository.save(updatedUser!);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Usuário com o cpf ${userFormDto.cpf} já existe`,
        );
      }

      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) this.throwNotFoundError(id);

    await this.usersRepository.softRemove(user!);

    return user!;
  }
}
