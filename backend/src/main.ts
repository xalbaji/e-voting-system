import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('🚀 Starting minimal application...');
  
  const app = await NestFactory.create(AppModule);
  
  // Simple health check
  app.getHttpAdapter().get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`✅ Server running on port ${port}`);
}

bootstrap();