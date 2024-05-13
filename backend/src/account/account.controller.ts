import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AccountService } from './account.service';
import { Roles } from './constants/rolePermissions';
import { Serialize } from '../decorators/serialize.decorator';
import { SignUpAdminDto } from './dtos/signup-admin.dto';
import { SignInDto } from './dtos/signin.dto';
import { ResponseDto } from './dtos/response.dto';


@Serialize(ResponseDto)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService){}

  @Get('/checkToken')
  async checkToken(@Req() req: Request){
    if(!req.query.token){
      return { success: false, msg: 'TOKEN_NOT_PROVIDED' };
    }
    return { msg: 'TOKEN_VERIFIED', id: req.decoded.id, profile_id: req.decoded.profile_id || null };
  }
  
  @Post('/basement/token')
  @HttpCode(200)
  async signInAsAdmin(@Body() body: SignInDto){
    const result = await this.accountService.signIn(body, Roles.Admin);
    return { msg: 'ACCOUNT_LOGGEDIN', data: result };
  }

  @Post('/basement')
  async signUpAsAdmin(@Body() body: SignUpAdminDto){
    const result = await this.accountService.signUp(body, Roles.Admin);
    return { msg: 'ACCOUNT_CREATED', data: result };
  }
}
