import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcom to the NestJS Application!';
  }
  getTest(): string {
    return 'Hello its api test';
  }
  getSecondTest(): string {
    return '  Hello its second api test';
  }
}
