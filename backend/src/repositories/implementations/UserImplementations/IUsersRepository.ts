import { UserEntity } from "../../../entities/User";
import { PrismaClient } from "@prisma/client";
export interface IUsersRepository {
  findByEmail(email: string): Promise<UserEntity>;
  save(user: UserEntity): Promise<void>;
  findUserByPassword(id:number, oldPassword: string): Promise<UserEntity>
  updateUserByPassword(id:number, newPassword: string): Promise<UserEntity>
  deleteUser(id:number):Promise<UserEntity>;
}