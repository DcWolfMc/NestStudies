import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?:'INTERN' | "ADMIN"|'ENGINEER') {
    return [];
  }

  @Get('interns') // GET /users/interns
  findAllInterns() {
    return [];
  }

  //:id most be declared after all possible users get calls
  //its a waterfall
  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }
  @Post() // POST /users
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string,@Body() userUpdate:{}) {
    return { id , ...userUpdate};
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return { id };
  }

}
