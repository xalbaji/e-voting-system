import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  
  // Health check endpoint
  app.getHttpAdapter().get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`✅ Server running on port ${port}`);
}

// Add retry logic for database connection
async function startWithRetry(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      await bootstrap();
      break;
    } catch (error) {
      console.log(`Failed to start (attempt ${i + 1}/${retries}):`, error.message);
      if (i === retries - 1) {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      // Wait 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

startWithRetry();