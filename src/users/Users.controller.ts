import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./Users.service";



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    };
    @Get(":userName")

    getUserByName(@Param("userName") userName: string) {
        console.log(userName, "wwww");
        return this.usersService.getUser(userName);
    }
    @Post(":userName")
    addNewUser(@Param() param: any) {
        console.log(param)
        return this.usersService.addNewUserName(param.userName)
    }
    @Delete(":userName")
    deleteUser(@Param("userName") userName: string) {
        console.log(userName)
        return this.usersService.deleteUserByName(userName)
    }
}