import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    // Enable CORS
    app.enableCors();
    
    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe());
    
    // API prefix
    app.setGlobalPrefix('api');
    
    await app.listen(3000);
    console.log('✅ E-Voting System is running on:');
    console.log('   API: http://localhost:3000/api');
    console.log('   Health: http://localhost:3000/api/health');
  } catch (error) {
    console.error('❌ Failed to start application:', error);
  }
}

bootstrap();