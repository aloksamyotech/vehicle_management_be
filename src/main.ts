import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.services';
import { GlobalExceptionFilter } from './common/exception.filter';
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  let db = false
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors({
    origin: '*', 
    credentials: true, 
    methods: '*',
    allowedHeaders: '*' 
  });
  
  const prismaService = app.get(PrismaService);
  try {
    await prismaService.$connect();
    db = true
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
  }
  const port = process.env.PORT ?? 7600;
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
  db ? console.log('✅ Database connected successfully') : console.error('❌ Failed to connect to the database:');

}

bootstrap();
