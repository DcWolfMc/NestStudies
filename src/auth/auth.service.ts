import { Injectable, UnauthorizedException } from '@nestjs/common';
import { authenticateDTO } from './dto/authenticate.auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwt: JwtService,
  ) {}

  async signIn(body: authenticateDTO) {
    const { email, password } = body;

    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.');
    }
    return this.generateUserTokens(user.id);
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwt.sign({ sub: userId }, { expiresIn: '10s' });
    const isRefreshToken = await this.databaseService.refreshToken.findUnique({
      where: { userId },
    });
    if (isRefreshToken) {
      await this.databaseService.refreshToken.delete({ where: { userId } });
    }
    const refreshToken = await this.createRefreshToken(userId);

    return { accessToken, refreshToken, userId };
  }

  async createRefreshToken(userId: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 2); //expiry date of 2 days

    return await this.databaseService.$transaction((prisma) => {
      return prisma.refreshToken.create({
        data: { expirationDate, userId },
      });
    });
  }
  async refreshTokens(refreshToken: string) {
    const token = await this.databaseService.refreshToken.delete({
      where: { token: refreshToken, expirationDate: { gte: new Date() } },
    });
    if (!token) {
      throw new UnauthorizedException("refreshTokenError - Token not found.");
    }
    return this.generateUserTokens(token.userId);
  }

  verifyToken(token: string) {
    return this.jwt.verify(token);
  }

  async getAll() {
    return this.databaseService.refreshToken.findMany();
  }
}
