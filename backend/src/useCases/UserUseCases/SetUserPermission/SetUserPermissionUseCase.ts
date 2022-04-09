import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";

export class SetUserPermissionUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(employerId: number,permissionsID:number) {
    const userFounded = await this.usersRepository.findUser(employerId);
    if (!userFounded) {
      throw new Error("User does not exist")
    }
    
    const user = await this.usersRepository.setUserPermission(employerId,permissionsID,userFounded.companyId);

    if (!user){
      throw new Error('User not found.');
    }
    return user

  }
}