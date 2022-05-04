import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IUserDTO } from "../IUserDTO";
import { UserEntity } from "../../../entities/User";

export class DeleteUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: number) {
    const userAlreadyExists = await this.usersRepository.findUser(id);

    if (!userAlreadyExists) {
      throw new Error('User not exists.');
    }
    const userDeleted = await this.usersRepository.deleteUser(id)
    if (!userDeleted){
      throw new Error('User id wrong, user has not been deleted')
    }
  }
}