import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    // You can return either plain text or HTML
    return `<h1>You have logged out</h1>
            <p><a href="/login.html">Click here to login again</a></p>`;
  }
}
