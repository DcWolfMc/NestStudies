import { IsBoolean, IsOptional } from "class-validator";
import { RefreshTokenDTO } from "./refresh-token-dto";

export class FindUserDto extends RefreshTokenDTO{

@IsOptional()
@IsBoolean()
includeRefreshToken?: boolean

@IsOptional()
@IsBoolean()
includeComments?: boolean        
}