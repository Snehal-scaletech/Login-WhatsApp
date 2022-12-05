import { ApiProperty } from "@nestjs/swagger";

export class AuthDto{
    @ApiProperty({
        description : "Token is used to verify user"
    })
    token:string;
}