import { PrismaClient } from "@prisma/client";
import { User } from '@prisma/client';

export class UserEntity implements User{
  public id: number
  public name: string;
  public email: string;
  public password: string;

  constructor(props) {
    Object.assign(props);
  }


}