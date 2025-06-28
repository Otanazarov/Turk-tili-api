import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { env } from './common/config';
import { SwaggerModule } from '@nestjs/swagger';
import { ApiSwaggerOptions } from './common/swagger/config.swagger';
import { HttpExceptionFilter } from './common/filter/httpException.filter';
import { getValidationErrors } from './common/utils/nestedError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  app.setGlobalPrefix('/api');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      exceptionFactory: (errors) => {
        const messages = getValidationErrors(errors);
        return new BadRequestException(messages.join(' | '));
      },
    }),
  );

  if (env.ENV === 'dev') {
    const ApiDocs = SwaggerModule.createDocument(app, ApiSwaggerOptions);
    SwaggerModule.setup('docs', app, ApiDocs, {
      customCssUrl: './public/swagger.css',
    });
  }

  await app.listen(env.PORT || 3000);
}
bootstrap();
