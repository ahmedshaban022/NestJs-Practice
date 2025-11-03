import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello U-Ahmed';
  }
  getTest(): string {
    return 'Test';
  }
  getSecondTest(): string {
    return 'Test 2';
  }
}
