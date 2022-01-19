import { PrismaClient } from "@prisma/client";


export class User {
   
  public name: string;
  public email: string;
  public password: string;

  constructor(props) {
    Object.assign(props);
  }


}