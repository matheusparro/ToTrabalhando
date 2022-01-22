import { User } from '@prisma/client';
import { hash } from 'bcrypt';

export class UserEntity implements User{
  public id: number
  public name: string;
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: Omit<UserEntity,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);    
  }
}