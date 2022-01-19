import { UserEntity } from "../entities/User";
import { PrismaClient } from "@prisma/client";
export interface IUsersRepository {
  findByEmail(email: string): Promise<UserEntity>;
  save(user: UserEntity): Promise<void>;
  findUserByPassword(email:string, oldPassword: string): Promise<UserEntity>
  updateUserByPassword(email:string, newPassword: string): Promise<UserEntity>
}