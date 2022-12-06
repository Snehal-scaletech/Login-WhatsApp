import { Controller, Post, Response, Request, Body, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto/auth.dto';
import { ValidationInputPipe } from './pipe/validation.pipe';

@ApiSecurity('basic')
@ApiHeader({
    name: 'Content-Type',
    description: 'Content-type',
})
@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    //This api is used for Signup user
    @Post('signup')
    async createUser(@Body() signupDto: SignupDto, @Response() res){
        const result = await this.authService.createUser(signupDto);
        return res.status(200).json({code:1, message:'Signup successfully', data:result})
    }

    //This api is used for login user 

    @Post('login')
    async loginUer(@Body() req, @Response() res){
        const result = await this.authService.loginUser(req);
        return res.status(200).json({code:1, message:"Login Successfully", data:result});
    }

    //This api is used to get the whatsapp login url or redirect user to whatsapp with prefilled text
    @Post('getLoginURL')
    @ApiResponse({ status: 200, description: 'URL created successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})

    async getLoginURL(@Response() res){

        const result = await this.authService.getLoginURL();

        const resultObj = JSON.parse(result);
        
        return res.status(200).json({code:resultObj.responseCode, message:resultObj.message, data:resultObj.data})

    }

    //This api is used to get user details after successful response
    @Post('verify_user')
    @ApiResponse({ status: 200, description: 'Verify user successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})

    async verify_user(@Body() authDto : AuthDto, @Response() res){

        const result = await this.authService.verify_user(authDto);

        const resultObj = JSON.parse(result);
        
        return res.status(200).json({code:resultObj.responseCode, message:resultObj.message, data:resultObj.data})

    }

    //This api is used to get user details
    @UseGuards(AuthGuard('jwt'))
    @Get('get_userdetails')
    async getUserDetails(@Request() req, @Response() res){
     
        return res.status(200).json({code:1, message:"User profile details found successfully", data:req.user});
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('edit_profile')
    async updateUserProfile(@Request() req, @Response() res, @Body() body){
        
        const result = await this.authService.updateDetails(req.user, body);
        return res.status(200).json({code:1, message:"User profile has been updated successfully"});
    }
}
