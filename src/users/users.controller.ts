import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthenticatorGuard } from 'src/authenticator/authenticator.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticatorGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthenticatorGuard)
  @Get(':id')
  findOne(@Param() id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @UseGuards(AuthenticatorGuard)
  @Put(':id')
  update(@Param() id: number, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  @UseGuards(AuthenticatorGuard)
  @Delete(':id')
  remove(@Param() id: number) {
    return this.usersService.delete(id);
  }
}
