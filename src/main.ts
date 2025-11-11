import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // optional, for browser requests
  await app.listen(3000);
  console.log('App listening on port 3000');
}
bootstrap();
