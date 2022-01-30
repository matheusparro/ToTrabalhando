import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IAppointmentParameterUser } from "../IUserDTO";
import { UserEntity } from "../../../entities/User";
import { hash } from "bcrypt";

export class AppointmentParameterUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IAppointmentParameterUser) {
    this.usersRepository.saveAppointmentParameterUser(data.userId, data.appointmentParametersId)

  }
}