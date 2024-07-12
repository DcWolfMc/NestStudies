import { IsBoolean, IsOptional } from "class-validator";

export class FindUserDto {
@IsOptional()
@IsBoolean()
includeRefreshToken?: boolean

@IsOptional()
@IsBoolean()
includeComments?: boolean        
}