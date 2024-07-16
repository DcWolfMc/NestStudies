import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class authenticateDTO {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

}