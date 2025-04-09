import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { generateDocs } from './docs';
import { TransferToSelf } from './modules/shared/filters/transfer-to-self.filter';
import { EntityValidationFilter } from './modules/shared/filters/entity-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new TransferToSelf(), new EntityValidationFilter());

  generateDocs(app);
  await app.listen(3000);
}
bootstrap();
