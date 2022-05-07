import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IUserDTO } from "../IUserDTO";
import { UserEntity } from "../../../entities/User";
import { hash } from "bcrypt";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: UserEntity) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('E-mail alredy used.');
    }
  

    const userCreated = await this.usersRepository.save(data);

    if (!userCreated){
      throw new Error('User not created.');
    }

  }
}