import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/env';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthenticationGuard } from './guards/authentication.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY');
        const publicKey = config.get('JWT_PUBLIC_KEY');
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, JwtStrategy, AuthenticationGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
