import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 5100;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log('main app listening on port => ', port);
}
bootstrap();
