import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IUserDTO } from "../IUserDTO";
import { UserEntity } from "../../../entities/User";
import { hash } from "bcrypt";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('E-mail alredy used.');
    }
    const user =  new UserEntity({
      name:data.name,
      email:data.email,
      isAdmin:data.isAdmin,
      password: await hash(data.password,8),
      Avatar: data.Avatar
    });

    const userCreated = await this.usersRepository.save(user);

    if (!userCreated){
      throw new Error('User not created.');
    }

  }
}