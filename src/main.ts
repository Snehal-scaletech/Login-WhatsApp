import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('WhatsApp Login')
    .setDescription('Integrate third party api to login using whatsapp.')
    .setVersion('1.0')
    .addTag('OTP')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();

   
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app, document);
  await app.listen(3000);
}
bootstrap();
