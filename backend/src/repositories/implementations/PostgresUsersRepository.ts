import { IUsersRepository } from "../IUsersRepository";
import { UserEntity } from "../../entities/User";
import { PrismaClient } from "@prisma/client";
export class PostgresUsersRepository implements IUsersRepository {
  constructor(
    private prisma = new PrismaClient()
  ){}

  private users: UserEntity[] = [];
 
  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async save(user: UserEntity): Promise<void> {
    // const userCreated = await this.prisma.user.create({
    //   data:{
    //     name:user.name,
    //     password:user.password,
    //     email:user.email
    //   }
    // })
  }

  async findUserByPassword(email: string, oldPassword): Promise<UserEntity> {
    const userPrismaFound = await this.prisma.user.findFirst({
      where: {email:email,password :oldPassword },
    })
    

    return userPrismaFound
  }

  async updateUserByPassword(email: string, newPassword: string): Promise<UserEntity> {
    const userPrismaUpdated= await this.prisma.user.update({
      where: {email:email},
      data: {
        password: newPassword,
      },
    })


    return userPrismaUpdated
  }

  
}