import { User } from "../entities/User";
import { PrismaClient } from "@prisma/client";
export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
  findUserByPassword(email:string, oldPassword: string): Promise<User>
  updateUserByPassword(email:string, newPassword: string): Promise<User>
}