import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    
    // Simple root endpoint (optional)
    app.getHttpAdapter().get('/', (req, res) => {
      res.json({ message: 'E-Voting API is running' });
    });
    
    const port = process.env.PORT || 3000;
    await app.listen(port);
    
    console.log(`✅ Server running on port ${port}`);
    
  } catch (error) {
    console.error('❌ Failed to start:', error);
    process.exit(1);
  }
}

bootstrap();