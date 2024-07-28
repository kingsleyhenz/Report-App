import { Prisma, User } from "@prisma/client";

export interface UserServices{
    createUsers(data: Prisma.UserCreateInput): Promise<User>
}