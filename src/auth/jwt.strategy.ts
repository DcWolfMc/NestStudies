import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Env } from 'src/env';
import { z } from 'zod';

const tokenSchema = z.object({
  sub: z.number(),
});
type TokenSchema = z.infer<typeof tokenSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true });

    const customExtractor = (req) => {
      let token = ExtractJwt.fromHeader('new-access-token')(req);
      if (!token) {
        token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      }
      return token;
    };

    super({
      jwtFromRequest: customExtractor,
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: TokenSchema) {
    console.log('Inside validate function', payload);

    return tokenSchema.parse(payload);
  }
}
