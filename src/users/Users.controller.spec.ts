import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './Users.controller';
import { UsersService } from './Users.service';
// log to show that the spec file is loaded
console.log('Users.controller.spec.ts loaded');
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', () => {
      const result = controller.getAllUsers();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toContain('ahmed');
      expect(result).toContain('mahmoud');
      expect(result).toContain('ali');
      expect(result).toContain('mostafa');
    });

    it('should call UsersService.getAllUsers', () => {
      const spy = jest.spyOn(service, 'getAllUsers');
      controller.getAllUsers();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getUserByName', () => {
    it('should return a user when found', () => {
      const result = controller.getUserByName('ahmed');
      expect(result).toBe('ahmed');
    });

    it('should return "user not found" when user does not exist', () => {
      const result = controller.getUserByName('nonexistent');
      expect(result).toBe('user not found');
    });

    it('should call UsersService.getUser with correct parameter', () => {
      const spy = jest.spyOn(service, 'getUser');
      controller.getUserByName('ahmed');
      expect(spy).toHaveBeenCalledWith('ahmed');
    });
  });

  describe('addNewUser', () => {
    it('should add a new user and return updated users array', () => {
      const initialLength = service.getAllUsers().length;
      const result = controller.addNewUser({ userName: 'newuser' });
      expect(result).toContain('newuser');
      expect(result.length).toBe(initialLength + 1);
    });

    it('should call UsersService.addNewUserName with correct parameter', () => {
      const spy = jest.spyOn(service, 'addNewUserName');
      controller.addNewUser({ userName: 'testuser' });
      expect(spy).toHaveBeenCalledWith('testuser');
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return updated users array', () => {
      // First add a user to delete
      service.addNewUserName('todelete');
      const initialLength = service.getAllUsers().length;

      const result = controller.deleteUser('todelete');
      expect(result).not.toContain('todelete');
      expect(result.length).toBe(initialLength - 1);
    });

    it('should call UsersService.deleteUserByName with correct parameter', () => {
      const spy = jest.spyOn(service, 'deleteUserByName');
      controller.deleteUser('ahmed');
      expect(spy).toHaveBeenCalledWith('ahmed');
    });

    it('should not affect other users when deleting', () => {
      const usersBefore = [...service.getAllUsers()];
      controller.deleteUser('ahmed');
      const usersAfter = controller.getAllUsers();

      // Check that other users still exist
      expect(usersAfter).toContain('mahmoud');
      expect(usersAfter).toContain('ali');
      expect(usersAfter).not.toContain('ahmed');
    });
  });

  describe('updateUser', () => {
    it('should update a user when found', () => {
      // Reset users array to ensure 'ahmed' exists
      service.users = ['ahmed', 'mahmoud', 'ali', 'mostafa'];

      const result = controller.updateUser('ahmed', 'ahmedUpdated');
      expect(result).toContain('ahmedUpdated');
      expect(result).not.toContain('ahmed');
    });

    it('should return "user not found" when user does not exist', () => {
      const result = controller.updateUser('nonexistent', 'newName');
      expect(result).toBe('user not found');
    });

    it('should call UsersService.updateUser with correct parameters', () => {
      const spy = jest.spyOn(service, 'updateUser');
      service.users = ['ahmed', 'mahmoud', 'ali', 'mostafa'];
      controller.updateUser('ahmed', 'newName');
      expect(spy).toHaveBeenCalledWith('ahmed', 'newName');
    });

    it('should only update the specified user', () => {
      service.users = ['ahmed', 'mahmoud', 'ali', 'mostafa'];
      controller.updateUser('ahmed', 'ahmedUpdated');
      const users = controller.getAllUsers();

      expect(users).toContain('ahmedUpdated');
      expect(users).toContain('mahmoud');
      expect(users).toContain('ali');
      expect(users).toContain('mostafa');
    });
  });
});

