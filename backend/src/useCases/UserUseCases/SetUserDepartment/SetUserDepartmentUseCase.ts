// import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";

// export class SetUserDepartmentUseCase {
//   constructor(
//     private usersRepository: IUsersRepository,
//   ) {}

//   async execute(employerId: number,departmentId:number) {
//     const userFounded = await this.usersRepository.findUser(employerId);
//     if (!userFounded) {
//       throw new Error("User does not exist")
//     }
    
//     const user = await this.usersRepository.setUserDepartment(employerId,departmentId,userFounded.companyId);

//     if (!user){
//       throw new Error('User not found to set Department.');
//     }
//     return user

//   }
// }