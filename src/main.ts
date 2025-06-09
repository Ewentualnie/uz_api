import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MyCacheInterceptor } from './interceptors/cache.interceptor';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Railway API')
    .setDescription('Railway API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const reflector = app.get(Reflector);
  const cacheManager = app.get<Cache>(CACHE_MANAGER);

  app.useGlobalInterceptors(new MyCacheInterceptor(cacheManager, reflector));

  await app.listen(3000);
}
bootstrap();
