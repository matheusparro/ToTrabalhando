import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IUserUpdatePassword } from "../IUserDTO";
import { UserEntity } from "../../../entities/User";
import { IMailProvider } from "../../../providers/IMailProvider";

export class UpdateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: IUserUpdatePassword) { // USUARIO JÁ ESTA LOGADO NESSE PONTO
    const userAlreadyExists = await this.usersRepository.findUserByPassword(data.id,data.oldPassword);

    if (!userAlreadyExists) {
      throw new Error('Password Wrong, try again');
    }
    const userUpdated = this.usersRepository.updateUserByPassword(data.id,data.newPassword)
    if (!userUpdated) {
      throw new Error('User not Updated');
    }
  }
}