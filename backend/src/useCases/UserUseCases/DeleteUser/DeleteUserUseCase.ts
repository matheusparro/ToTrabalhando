import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IUserDTO } from "../IUserDTO";
import { UserEntity } from "../../../entities/User";
import { IMailProvider } from "../../../providers/IMailProvider";

export class DeleteUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: number) {
 
    const userAlreadyExists = this.usersRepository.deleteUser(id)
    if (userAlreadyExists){
      throw new Error('User id wrong, user has not been deleted')
    }

  

  }
}