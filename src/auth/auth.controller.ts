import { Controller, Post, Response, Request, Body } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiSecurity('basic')
@ApiHeader({
    name: 'Content-Type',
    description: 'Content-type',
})
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('login')
    @ApiResponse({ status: 200, description: 'URL created successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async login(@Response() res){
        const result = await this.authService.login();

        const resultObj = JSON.parse(result);
        
        return res.status(200).json({code:resultObj.responseCode, message:resultObj.message, data:resultObj.data})
    }

    @Post('verify_user')
    @ApiResponse({ status: 200, description: 'Verify user successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async verify_user(@Body() authDto : AuthDto, @Response() res){
        const result = await this.authService.verify_user(authDto);

        const resultObj = JSON.parse(result);
        
        return res.status(200).json({code:resultObj.responseCode, message:resultObj.message, data:resultObj.data})
    }
}
