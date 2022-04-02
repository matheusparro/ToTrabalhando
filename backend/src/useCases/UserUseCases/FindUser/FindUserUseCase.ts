import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";

export class FindUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: number) {
    const user = await this.usersRepository.findUser(id);

    if (!user){
      throw new Error('User not found.');
    }
    return user

  }
}