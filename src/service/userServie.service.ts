import { Prisma, User } from "@prisma/client";

export interface UserServices{
    createUsers(data: Prisma.UserCreateInput): Promise<User>
    getUserById(id: number): Promise<User | null>
    listUser(): Promise<User[]>
}