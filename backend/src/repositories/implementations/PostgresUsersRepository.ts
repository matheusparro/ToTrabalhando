import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";
import { PrismaClient } from "@prisma/client";
export class PostgresUsersRepository implements IUsersRepository {
  constructor(
    private prisma = new PrismaClient()
  ){}

  private users: User[] = [];
 
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async save(user: User): Promise<void> {
    // const userCreated = await this.prisma.user.create({
    //   data:{
    //     name:user.name,
    //     password:user.password,
    //     email:user.email
    //   }
    // })
  }

  async findUserByPassword(email: string, oldPassword): Promise<User> {
    const userPrismaFound = await this.prisma.user.findFirst({
      where: {email:email,password :oldPassword },
    })
    
    const user:User = {
      id: userPrismaFound.id,
      name: userPrismaFound.name,
      email: userPrismaFound.email,
      password: userPrismaFound.password,
    }

    return user
  }

  async updateUserByPassword(email: string, newPassword: string): Promise<User> {
    const userPrismaUpdated= await this.prisma.user.update({
      where: {email:email},
      data: {
        password: newPassword,
      },
    })
    const user:User = {
      id: userPrismaUpdated.id,
      name: userPrismaUpdated.name,
      email: userPrismaUpdated.email,
      password: userPrismaUpdated.password,
    }

    return user
  }

  
}