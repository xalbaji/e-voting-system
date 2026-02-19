import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // main controller or app controller
@Get()
getRoot() {
  return `<h1>You have logged out</h1>
          <p><a href="/login.html">Click here to login again</a></p>`;
}


};