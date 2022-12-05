import { Injectable } from '@nestjs/common';
@Injectable()
export class AuthService {

    async login():Promise<any>{
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
}
