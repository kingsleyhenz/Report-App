import { Prisma, User } from "@prisma/client";
import { customError } from "../../error/customError";
import { db } from "../../utils/db.utils";
import { UserServices } from "../userServie.service";

export class UserServiceImplementation implements UserServices{
    
    async createUsers(data: Prisma.UserCreateInput): Promise<User> {
        const existingUser = await db.user.findUnique({
            where: {email: data.email},
        });
        
        if(existingUser){
            throw new customError(409, "Email Already In Use")
        }
        return await db.user.create({ data });
    }
    
}