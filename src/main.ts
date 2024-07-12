import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './all-exceptions.filter';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

async function bootstrap() {
  // to have logs globally, use this lines:
  // const app = await NestFactory.create(AppModule, {bufferLogs: true});
  // app.useLogger(app.get(LoggerModule))

  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  const configService = app.get<ConfigService<Env, true>> (ConfigService);
  const port = configService.get('PORT',{infer: true})
  app.setGlobalPrefix('api');
  // About cores, study more to better config it.
  app.enableCors();

  await app.listen(port);
}
bootstrap();
