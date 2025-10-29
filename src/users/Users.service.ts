import { Injectable } from "@nestjs/common";


@Injectable()

export class UsersService {
    users: string[] = ["ahmed", "mahmoud"];
    getAllUsers() {
        return this.users;
    };
    getUser(userName: string) {
        return this.users.find(user => user === userName) || "user not found";
    };
    addNewUserName(userName: string) {
        this.users.push(userName);
        return this.users
    };
    deleteUserByName(userName: string) {
        this.users = this.users.filter(user => user !== userName);
        return this.users
    };
}