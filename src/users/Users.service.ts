import { Injectable } from "@nestjs/common";


@Injectable()

export class UsersService {
    users: string[] = ["ahmed", "mahmoud", "ali", "mostafa"];
    // get all users
    getAllUsers() {
        return this.users;
    };
    // get a single user
    getUser(userName: string) {
        return this.users.find(user => user === userName) || "user not found";
    };
    // add a new user
    addNewUserName(userName: string) {
        this.users.push(userName);
        return this.users
    };
    // delete a user
    deleteUserByName(userName: string) {
        this.users = this.users.filter(user => user !== userName);
        return this.users
    };
    // update a user
    updateUser(userName: string, name: string) {
        const index = this.users.findIndex(user => user === userName);
        if (index !== -1) {
            this.users[index] = name;
            return this.users;
        }
        return "user not found";
    }
}