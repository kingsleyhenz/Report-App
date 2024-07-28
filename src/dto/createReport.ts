import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class createReportDto{
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @IsInt()
    userId: number

    constructor(title: string, content: string, userId: number){
        this.content = content;
        this.title = title;
        this.userId = userId;
    }
}