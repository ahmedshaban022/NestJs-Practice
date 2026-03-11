import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// this is the controller for the app
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    // this is the root route
    return this.appService.getHello();
  }
  @Get("/test")
  getTest(): string {
    return this.appService.getTest();
  }
}
