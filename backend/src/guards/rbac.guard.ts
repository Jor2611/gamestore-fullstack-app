import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccountService } from "../account/account.service";
import { AccessTypes, Permission, Roles, rolePermissionMap } from "../account/constants/rolePermissions";
import { AccountStatus } from "../account/constants/enums";

@Injectable()
export class RBACGuard implements CanActivate{
  constructor(private reflector: Reflector, private accountService: AccountService){}
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const acl = this.reflector.get('acl',context.getHandler()); 
    if(acl){

      if(!request.decoded){
        throw new UnauthorizedException();
      }

      if(request.decoded.role === 'root'){
        request.accessType = AccessTypes.All;
        return true;
      }

      const account = await this.accountService.findOneBy({ id: request.decoded.id });

      //In case token exists, but account not!
      if(!account){
        throw new UnauthorizedException();
      }else if(account.status === AccountStatus.Pending){
        throw new UnauthorizedException('ACCOUNT_IS_PENDING');
      }else if(account.status === AccountStatus.Suspended){
        throw new UnauthorizedException('ACCOUNT_WAS_SUSPENDED');
      }else if(account.status === AccountStatus.Deleted){
        throw new UnauthorizedException('ACCOUNT_DOESNT_EXIST');
      }
      
      const permission = this.checkPermission(request.decoded.role, acl.resource, acl.operation);

      if(!permission){
        return false;
      }

      request.accessType = permission.access;
    }

    return true;
  }

  private checkPermission(userRole: Roles, resource: string, operation: string): Permission {
    const userPermissions = rolePermissionMap[userRole];
    const matchingPermission = userPermissions.find(perm => perm.resource === resource && perm.operation === operation);
    
    return matchingPermission;  
  }
}