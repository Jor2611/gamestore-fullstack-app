import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Roles } from './constants/rolePermissions';
import { Account } from './account.entity';
import { AccountStatus, JWTEexpirations } from './constants/enums';

const scrypt = promisify(_scrypt);

interface LoginAccountData {
  email: string;
  password: string;
  rememberMe: boolean
}

interface SignUpAccountData {
  email: string;
  password: string;
  status?: AccountStatus
}

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly repository: Repository<Account>,
    private config: ConfigService, 
    private jwtService: JwtService,
  ){}

  findOneBy(filter: any) {
    return this.repository.findOneBy(filter) || null;
  }

  async signUp(data: SignUpAccountData, role: Roles){
    try{
      const result = await this.repository.manager.transaction(async (manager: EntityManager) => {
        await manager.query(`SET lock_timeout = '30s';`);
        const { email, password } = data; 
  
        const account = await manager.findOneBy(Account, { email });
  
        if(account){
          /**
           * In case if admin has email in members it will
           * show as taken email!
           */
          throw new BadRequestException('EMAIL_IS_TAKEN');
        }
  
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const hashedPassword = `${salt}.${hash.toString('hex')}`;
  
        /**
         * Refactor when account status logic will be implemented 
         */
        if(role === Roles.Admin){
          const newAccount = manager.create(Account, { email, password: hashedPassword, status: AccountStatus.Active, role });
          return await manager.save(Account, newAccount);
        }
  
        
        const newAccount = manager.create(Account, { email, password: hashedPassword, status: data.status || AccountStatus.Active, role });
        return await manager.save(Account, newAccount);
      });

      return result;
    }catch(err){
      // console.log(err);

      if(err instanceof QueryFailedError && err.driverError && err.driverError.code === '55P03'){
        throw new InternalServerErrorException('ROW_LOCKED_TOO_LONG')
      } else if(err instanceof InternalServerErrorException){
        throw new InternalServerErrorException('SERVER_ERROR')
      }

      throw err;
    }
  }

  async signIn(data: LoginAccountData, definedRole: Roles) {
    const { email, password, rememberMe } = data;
    const account = await this.repository.findOne({ where: { email } });
    
    if(!account || account.role !== definedRole || account.status === AccountStatus.Deleted){
      throw new BadRequestException('WRONG_CREDENTIALS');
    }

    if(account.status === AccountStatus.Pending){
      throw new BadRequestException('ACCOUNT_IS_PENDING');
    }

    if(account.status === AccountStatus.Suspended){
      throw new BadRequestException('ACCOUNT_WAS_SUSPENDED');
    }

    const [salt, storedHash] = account.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if(storedHash !== hash.toString('hex')){
      throw new BadRequestException('WRONG_CREDENTIALS');
    }

    const payload = { 
      id: account.id, 
      email: account.email, 
      role: account.role 
    };

    let expiresIn = account.role === Roles.Admin 
      ? this.config.get<string>(JWTEexpirations.ADMIN)
      : this.config.get<string>(JWTEexpirations.REGULAR);
    
    if(rememberMe) {
      expiresIn = this.config.get<string>(JWTEexpirations.REMEMBER_ME);
    }

    try{
      const token = await this.jwtService.signAsync(payload, { expiresIn });
      return { ...account, token };
    }catch(err){
      console.log(err);
      throw new InternalServerErrorException('SERVER_ERROR');
    }
  }

}