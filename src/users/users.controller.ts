import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    return this.userService.findAll(role);
  }

  @Get('interns') // GET /users/interns
  findAllInterns() {
    return [];
  }

  //:id most be declared after all possible users get calls
  //its a waterfall
  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }
  @Post() // POST /users
  create(@Body() user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    return this.userService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: {
    name?: string;
    email?: string;
    role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    return this.userService.update(Number(id), userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}
