import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello U-Ahmed"', () => {
      expect(appController.getHello()).toBe('Hello U-Ahmed');
    });

    it('should call AppService.getHello', () => {
      const spy = jest.spyOn(appService, 'getHello');
      appController.getHello();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getTest', () => {
    it('should return "Test"', () => {
      expect(appController.getTest()).toBe('Test');
    });

    it('should call AppService.getTest', () => {
      const spy = jest.spyOn(appService, 'getTest');
      appController.getTest();
      expect(spy).toHaveBeenCalled();
    });
  });
});
