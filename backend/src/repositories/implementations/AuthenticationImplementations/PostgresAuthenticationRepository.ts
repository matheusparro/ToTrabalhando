import { UserEntity } from "../../../entities/User";
import { client } from "../../../prisma/client";
import {compare} from 'bcrypt'
import { IAuthenticationRepository } from "./IAuthenticationRepository";
export class PostgresAuthenticationRepository implements IAuthenticationRepository {
  async findToLogin(email: string, password: string): Promise<UserEntity> {
    const userAlreadyExists = await client.user.findFirst({
      where:{email}
    })
    
    if (!userAlreadyExists){
      return null
    }

    if(! await compare(password, userAlreadyExists.password)){
      return null
    }
    return userAlreadyExists
  }
  


}