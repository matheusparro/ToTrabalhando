import { PostgresUsersRepository } from "../../../repositories/implementations/UserImplementations/PostgresUsersRepository";
import { AppointmentParameterUserUseCase } from "./AppointmentParameterUserUseCase";
import { AppointmentParameterUserController } from "./AppointmentParameterUserController";

const postgresUsersRepository = new PostgresUsersRepository()

const appointmentParameterUserUseCase = new AppointmentParameterUserUseCase(
  postgresUsersRepository,
)

const appointmentParameterUserController = new AppointmentParameterUserController(
  appointmentParameterUserUseCase
)

export { appointmentParameterUserUseCase, appointmentParameterUserController }