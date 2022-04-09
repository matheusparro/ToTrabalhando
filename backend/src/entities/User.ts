import { User } from '@prisma/client';
import { PermissionsEntity } from './Permissions'
export class UserEntity implements User{
  public id: number
  public companyId: number
  public name: string;
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;
  public isAdmin: boolean
  public Avatar: string;
  public departmentId: number;
  public permissionsID: number;
  public permissions?:PermissionsEntity


  constructor(props: Omit<UserEntity,'id'|'createdAt'|'updatedAt' | 'permissions' >) {
    Object.assign(this,props);    
  }
  
}