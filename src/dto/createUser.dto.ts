import { IsEmail,IsNotEmpty,IsString } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    name:string;

    constructor(email:string, name:string){
        this.email = email;
        this.name = name;
    }
}