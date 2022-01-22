import { UserEntity } from "../../../entities/User";
import { PrismaClient } from "@prisma/client";
export interface IUsersRepository {
  findByEmail(email: string): Promise<UserEntity>;
  save(user: UserEntity): Promise<void>;
  deleteUser(id:number):Promise<UserEntity>;
}