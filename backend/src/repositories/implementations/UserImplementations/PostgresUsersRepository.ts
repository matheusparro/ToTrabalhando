import { IUsersRepository } from "./IUsersRepository";
import { UserEntity } from "../../../entities/User";
import { PrismaClient } from "@prisma/client";
import { client } from "../../../prisma/client";
export class PostgresUsersRepository implements IUsersRepository {
  async setUserPermission(id: number, permissionID: number,companyId:number): Promise<UserEntity> {
    const permissionFounded = await client.permissions.findFirst({
      where:{
        id:permissionID,
        companyId:companyId
      }
    })
    if(!permissionFounded){
      throw new Error("Permission not exist")
    }
    const updateUser = await client.user.update({
      where: {
        id 
      },
      data: {
        permissionsID:permissionID
      },
    })
    return updateUser
  }
  



  async findByEmail(email: string): Promise<UserEntity> {
    const user = await client.user.findUnique({
      where: {
       email
      },
    })
    return user;
  }
   
  async findUser(id:number){
    const user = await client.user.findUnique({
      where: {
       id
      },
      include:{
        permissions:true,
      },
      
    })
    return user;
  }

  async save(user: UserEntity): Promise<UserEntity> {
     

     try {
      const userCreated= await client.user.create({
        data:{
            name:user.name,
            password:user.password,
            email:user.email,
            isAdmin:user.isAdmin,
            Avatar:user.Avatar,
         }
       })
       return userCreated
    } catch (error) {
      throw new Error(error.message);
    }
    
  }

  async deleteUser(id: number): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  
  
}