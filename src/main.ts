import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js'
import { OrderService } from './functions/saveOrders.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // optional, for browser requests
  await app.listen(3000);
  console.log('App listening on port 3000');
  const service = new OrderService();
  const result = await service.saveOrders();
  console.log(result+"cccccccccccccccccccc");
}
bootstrap();
