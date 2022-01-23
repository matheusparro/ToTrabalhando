import { User } from '@prisma/client';

export class UserEntity implements User{
  public id: number
  public name: string;
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;
  public isAdmin: boolean

  constructor(props: Omit<UserEntity,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);    
  }
}