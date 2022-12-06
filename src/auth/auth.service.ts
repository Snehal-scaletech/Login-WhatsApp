import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './auth.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth)
        private authModel:typeof Auth,
        private jwtService : JwtService){}

    async createUser(userdata): Promise<Auth>{

        const checkEmailExitOrNot = await this.checkEmailExist(userdata.email);

        if(checkEmailExitOrNot){
            throw new BadRequestException("Email address already exist, please check with different details.")
        }else{
            const hash = await bcrypt.hash(userdata.password, 16);
            userdata.password = hash;
            const addData = await this.authModel.create<Auth>(userdata);

            if(!addData){
                throw new BadRequestException("Something went wrong!")
            }
            return addData;
        }
    }

    checkEmailExist(email:string){
        return this.authModel.findOne({where:{email:email, status:'Active', is_deleted:'0'}});
    }

    async loginUser(userdata){
      
        const user = await this.checkEmailExist(userdata.email);
   
        if(!user){
            throw new UnauthorizedException("User details not found.")
        }else{
            const isMatch = await bcrypt.compare(userdata.password, user.password);
            if(isMatch){
                console.log(user.dataValues)
                const access_token = await this.jwtService.sign(user.dataValues); 
            
                return {userdata : user, token :access_token };
            }else{
                throw new UnauthorizedException("Password does not match.")
            }
        }
    }

    async getLoginURL():Promise<any>{
        const getUrlResults = await this.getUrlResult();
        return getUrlResults;
    }

    getUrlResult(){
        var request = require('request');
        var options = {
            'method': 'POST',
            'url': process.env.API_GET_URL_TEST,
            'headers': {
                'appId': process.env.APP_ID,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "loginMethod": "WHATSAPP",
                "redirectionURL": "www.google.com",
                "state": "WhatsappLogin",
                "orderId":"123"
            })
        };

        return new Promise(function(resolve, reject) {
            request(options, function(error, response) {
                console.log(error)
                console.log(response.body)
                if (error) {
                    reject(error);
                } else {
                    resolve(response.body);
                }
            })
        })
    }

    async verify_user(req): Promise<any>{
        const verify_user = await this.verifyUserResponse(req);
        return verify_user;
    }

    verifyUserResponse(req){
        var request = require('request');
        var options = {
            'method': 'POST',
            'url': process.env.API_VERIFY_USER_URL_TEST,
            'headers': {
                'appId': process.env.APP_ID,
                'appSecret' : process.env.APP_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token": req.token
            })
        };

        return new Promise(function(resolve, reject) {
            request(options, function(error, response) {
                console.log(error)
                console.log(response.body)
                if (error) {
                    reject(error);
                } else {
                    resolve(response.body);
                }
            })
        })
    }

    async updateDetails(req, body){
        
        const hash = await bcrypt.hash(body.password, 16);
        
        const updatedata = await this.authModel.update({ name: body.name, email:body.email, password:hash }, {where: {id: req.id}});
        return updatedata;
    }
    
}
