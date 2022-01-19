import { User } from '@prisma/client';

export class UserEntity implements User{
  public id: number
  public name: string;
  public email: string;
  public password: string;

  constructor(props: Omit<UserEntity,'id'>) {
    Object.assign(this,props);
  }


}