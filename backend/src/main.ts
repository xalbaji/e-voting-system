import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  console.log('🚀 Starting E-Voting application...');

  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    

    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');

    console.log(`✅ Server started on port ${port}`);
    console.log(`📡 API root: http://localhost:${port}/api`);
    if (process.env.NODE_ENV === 'production') {
      console.log(`📡 Railway URL: ${process.env.RAILWAY_STATIC_URL || 'Check Railway dashboard'}`);
    }

  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

bootstrap();
