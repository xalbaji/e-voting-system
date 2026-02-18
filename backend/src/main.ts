import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🚀 Starting E-Voting application...');

  try {
    const app = await NestFactory.create(AppModule);

    // Enable CORS and global validation
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    
    // Set API prefix
    app.setGlobalPrefix('api');

    // Optional: simple root endpoint
    app.getHttpAdapter().get('/', (req, res) => {
      res.json({
        message: 'E-Voting API is running locally',
        timestamp: new Date().toISOString()
      });
    });

    // Use local port or default to 3000
    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');

    console.log(`✅ Server started on port ${port}`);
    console.log(`📡 API root: http://localhost:${port}/api`);
    
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

// Optional: handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

bootstrap();
