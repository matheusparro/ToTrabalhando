import { UserEntity } from "../../../entities/User";
export interface IAuthenticationRepository {
  findToLogin(email:string,password:string):Promise<UserEntity>
}
