import { Injectable } from "@nestjs/common";


@Injectable()

export class UsersService {
    users: string[] = ["ahmed", "mahmoud", "ali", "mostafa"];
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
    updateUser(userName: string, name: string) {
        const index = this.users.findIndex(user => user === userName);
        if (index !== -1) {
            this.users[index] = name;
            return this.users;
        }
        console.log("user not found");
        return "user not found";
    }
}