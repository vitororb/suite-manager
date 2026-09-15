import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserFormDto } from './dtos/user-form.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userFormDto: UserFormDto): Promise<User> {
    return this.usersService.create(userFormDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() userFormDto: UserFormDto,
  ): Promise<User> {
    return this.usersService.update(+id, userFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<User> {
    return this.usersService.remove(+id);
  }
}
