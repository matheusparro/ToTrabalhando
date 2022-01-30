import { UserEntity } from "../../../entities/User";
import { PrismaClient } from "@prisma/client";
export interface IUsersRepository {
  findByEmail(email: string): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
  deleteUser(id:number):Promise<UserEntity>;
  saveAppointmentParameterUser( userId: number,appointmentParametersId: number):Promise<void>;
}