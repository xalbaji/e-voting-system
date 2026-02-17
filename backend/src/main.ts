import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🚀 Starting application...');
  
  // Log all environment variables (without exposing passwords fully)
  console.log('🔍 Environment Variables:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('PORT:', process.env.PORT);
  console.log('--- Database Variables ---');
  console.log('MYSQLHOST:', process.env.MYSQLHOST);
  console.log('MYSQLPORT:', process.env.MYSQLPORT || '❌ NOT SET');
  console.log('MYSQLUSER:', process.env.MYSQLUSER);
  console.log('MYSQLDATABASE:', process.env.MYSQLDATABASE || '❌ NOT SET');
  console.log('MYSQLPASSWORD:', process.env.MYSQLPASSWORD);
  console.log('DB_HOST:', process.env.DB_HOST || '❌ NOT SET');
  console.log('DB_PORT:', process.env.DB_PORT || '❌ NOT SET');
  console.log('------------------------');

  try {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    
    // Simple root endpoint
    app.getHttpAdapter().get('/', (req, res) => {
      res.json({ 
        message: 'E-Voting API is running',
        timestamp: new Date().toISOString()
      });
    });
    
    const port = process.env.PORT || 3000;
    await app.listen(port);
    
    console.log(`✅ Server successfully started on port ${port}`);
    console.log(`📡 API root: http://localhost:${port}/api`);
    
  } catch (error) {
    console.error('❌ Failed to start application:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

bootstrap();