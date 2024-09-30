import { ConfigService } from "@nestjs/config";
import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "./libs/logger/global-exception.filter";
import { LoggerService } from "./libs/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/library');
  const configService = app.get(ConfigService);

  const logger = app.get(LoggerService);
  app.useGlobalFilters(
    new GlobalExceptionFilter(app.get(HttpAdapterHost), logger),
  );
  app.useLogger(logger);

  if (configService.get<string>('API_DOCS_ENABLED') === 'true') {
    const config = new DocumentBuilder()
      .setTitle('SERVICE-CORE API documentation')
      .setDescription(
        'Development API documentation for nashdim service-core microservice',
      )
      .setVersion('1.0')
      .build();
    //const document = SwaggerModule.createDocument(app, config);
    //SwaggerModule.setup('api/library/api-docs', app, document);
  }
  app.enableCors();
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
