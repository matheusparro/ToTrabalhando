import { UserEntity } from "../../../entities/User";

export interface IUsersRepository {
  findByEmail(email: string): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
  deleteUser(id:number):Promise<UserEntity>;
  findUser(id:number): Promise<UserEntity>;
  setUserPermission(id:number,permissionID:number,companyId:number): Promise<UserEntity>;
  // setUserDepartment(id:number,departmentId:number,companyId:number): Promise<UserEntity>;
}