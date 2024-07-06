import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerModule } from './logger/logger.module';
import { AllExceptionFilter } from './all-exceptions.filter';

async function bootstrap() {
  // to have logs globally, use this lines:
  // const app = await NestFactory.create(AppModule, {bufferLogs: true});
  // app.useLogger(app.get(LoggerModule))

  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  app.setGlobalPrefix('api');
  // About cores, study more to better config it.
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
