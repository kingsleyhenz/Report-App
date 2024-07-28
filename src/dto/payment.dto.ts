import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class PayDto{
    @IsNotEmpty()
    @IsNumber()
    user_id!: number;

    @IsOptional()
    @IsString()
    name!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(50)
    amount!: number;

    @IsOptional()
    @IsString()
    description!: string;
}