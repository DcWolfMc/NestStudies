import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  // About cores, study more to better config it.
  app.enableCors()

  await app.listen(3000);
}
bootstrap();