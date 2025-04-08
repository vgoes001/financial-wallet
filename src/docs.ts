import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function generateDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Carteira Financeira')
    .setDescription('API para gerenciar uma carteira financeira')
    .setVersion('1.0')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
}
