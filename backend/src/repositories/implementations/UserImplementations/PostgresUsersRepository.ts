import { IUsersRepository } from "./IUsersRepository";
import { UserEntity } from "../../../entities/User";
import { PrismaClient } from "@prisma/client";
import { client } from "../../../prisma/client";
export class PostgresUsersRepository implements IUsersRepository {



  private users: UserEntity[] = [];
 
  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async save(user: UserEntity): Promise<UserEntity> {
     return await client.user.create({
      data:{
          name:user.name,
          password:user.password,
          email:user.email,
          isAdmin:user.isAdmin,
          Avatar:user.Avatar
       }
     })
  }

  async deleteUser(id: number): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  async saveAppointmentParameterUser(userId: number, appointmentParametersId: number): Promise<void> {
    try {
      await client.appointmentParametersOnUsers.create({
        data:{userId,appointmentParametersId}
      })
    } catch (error) {
      throw new Error(error.message || "Error to create");
    }
    
  }
  
  
  
}