import { User } from '@prisma/client';
import { PermissionsEntity } from './Permissions'
export class UserEntity implements User{
  public id: number
  public companyId: number
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;
  public Avatar: string;
  public permissionsID: number;
  public permissions?:PermissionsEntity
  public employeeId: number;

  constructor(props: Omit<UserEntity,'id'|'createdAt'|'updatedAt' | 'permissions' >) {
    Object.assign(this,props);    
  }

  
}