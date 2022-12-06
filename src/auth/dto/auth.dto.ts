import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class SignupDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @ApiProperty()
    password:string;

}
export class AuthDto{
    @ApiProperty({
        description : "Token is used to verify user"
    })
    token:string;
}