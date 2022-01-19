import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IUserDTO } from "../IUserDTO";
import { UserEntity } from "../../../entities/User";
import { IMailProvider } from "../../../providers/IMailProvider";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: IUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new UserEntity({
      name:data.name,
      email:data.email,
      password:data.password
    });

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Equipe do Meu App',
        email: 'equipe@meuapp.com',
      },
      subject: 'Seja bem-vindo à plataforma',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    })
  }
}