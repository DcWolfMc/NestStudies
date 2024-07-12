import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userDto: Prisma.UserCreateInput) {
    const { email, name, password } = userDto;
    const hashedPassword = await hash(password, 10);

    return this.databaseService.$transaction(async (prisma) => {
      const user = prisma.user.create({
        data: { email, name, password: hashedPassword },
      });
      return user;
    });
  }

  async findAll() {
    return await this.databaseService.user.findMany({
      include: { refreshToken: true },
    });
  }

  async findOne(
    id: number,
    includeRefreshToken: boolean = false,
    includeComments: boolean = false,
  ) {
    return this.databaseService.user.findFirst({
      where: { id },
      include: {
        refreshToken: includeRefreshToken,
        comments: includeComments,
      },
    });
  }

  async update(id: number, updatedUser: Prisma.UserUpdateInput) {
    return await this.databaseService.$transaction(async (prisma) => {
      return prisma.user.update({
        where: { id },
        data: updatedUser,
      });
    });
  }

  async delete(id: number) {
    return await this.databaseService.user.delete({ where: { id } });
  }
}
