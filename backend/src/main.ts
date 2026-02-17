import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('Railway MySQL Variables:', {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  database: process.env.MYSQLDATABASE,
  hasPassword: !!process.env.MYSQLPASSWORD
});

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'], // Enable all logs
    });
    
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
    
    // Add a simple root endpoint for testing
    app.getHttpAdapter().get('/', (req, res) => {
      res.json({ 
        message: 'E-Voting API is running',
        version: '1.0.0'
      });
    });
    
    const port = process.env.PORT || 3000;
    await app.listen(port);
    
    console.log(`✅ Server successfully started on port ${port}`);
    console.log(`📡 Health check: http://localhost:${port}/api/health`);
    console.log(`📡 API root: http://localhost:${port}/api`);

    
  } catch (error) {
    console.error('❌ Failed to start application:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

// Add retry logic for database connection
async function startWithRetry(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Starting attempt ${i + 1}/${retries}...`);
      await bootstrap();
      return; // Success, exit the retry loop
    } catch (error) {
      console.log(`❌ Attempt ${i + 1}/${retries} failed:`, error.message);
      
      // If it's a database connection error, log specific info
      if (error.message.includes('ECONNREFUSED') || error.message.includes('connect')) {
        console.log('💡 Database connection refused. Check:');
        console.log('   - MySQL host is correct');
        console.log('   - MySQL is running');
        console.log('   - Credentials are correct');
        console.log('   - Network allows connection');
      }
      
      if (i === retries - 1) {
        console.error('❌ Max retries reached. Exiting...');
        process.exit(1);
      }
      
      console.log(`⏳ Waiting 5 seconds before retry ${i + 2}...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
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

startWithRetry();