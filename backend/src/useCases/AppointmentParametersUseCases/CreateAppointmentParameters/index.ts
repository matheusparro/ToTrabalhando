import { PostgresAppointmentParametersRepository } from "../../../repositories/implementations/AppointmentParametersImplementations/PostgresAppointmentParametersRepository";
import { CreateAppointmentParametersUseCase } from "./CreateAppointmentParametersUseCase";
import { CreateAppointmentParametersController } from "./CreateAppointmentParametersController";

const postgresAppointmentParametersRepository = new PostgresAppointmentParametersRepository()

const createAppointmentParametersUseCase = new CreateAppointmentParametersUseCase(
  postgresAppointmentParametersRepository,
)

const createAppointmentParametersController = new CreateAppointmentParametersController(
  createAppointmentParametersUseCase
)

export { createAppointmentParametersUseCase, createAppointmentParametersController }