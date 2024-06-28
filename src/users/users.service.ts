import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Lee X',
      email: 'leex@leex.lee',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Zang Z',
      email: 'Zangz@Zangz.zz',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Rui Ramos',
      email: 'ruiramos@rrui.rr',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Bolleg',
      email: 'Bolleg@exslave.ns',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Bob Boing',
      email: 'Bobboing@bbb.bb',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: CreateUserDto) {
    const userByHighstId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: userByHighstId[0].id + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: UpdateUserDto,
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
