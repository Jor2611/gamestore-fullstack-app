import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { Serialize } from 'src/decorators/serialize.decorator';
import { SignUpAdminDto } from './dtos/signup-admin.dto';
import { Roles } from './constants/rolePermissions';
import { SignInDto } from './dtos/signin.dto';
import { ResponseDto } from './dtos/response.dto';

@Serialize(ResponseDto)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService){}
  
  @Post('/basement/token')
  @HttpCode(200)
  async signInForAdmin(@Body() body: SignInDto){
    const result = await this.accountService.signIn(body, Roles.Admin);
    return { msg: 'ACCOUNT_LOGGEDIN', data: { ...result } };
  }

  @Post('/basement')
  async signUpAdmin(@Body() body: SignUpAdminDto){
    const result = await this.accountService.signUp(body, Roles.Admin);
    return { msg: 'ACCOUNT_CREATED', data: result };
  }
}
