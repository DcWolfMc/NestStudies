import { IsString, IsOptional } from "class-validator";

export class RefreshTokenDTO {
@IsOptional()
@IsString()
refreshToken?: string
   
}