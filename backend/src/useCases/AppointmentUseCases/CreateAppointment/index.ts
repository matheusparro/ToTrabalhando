import { PostgresAppointmentRepository } from "../../../repositories/implementations/AppointmentImplementations/PostgresAppointmentRepository";
import { CreateAppointmentUseCase } from "./CreateAppointmentUseCase";
import { CreateAppointmentController } from "./CreateAppointmentController";

const postgresAppointmentRepository = new PostgresAppointmentRepository()
const createAppointmentUseCase = new CreateAppointmentUseCase(
  postgresAppointmentRepository
)

const createAppointmentController = new CreateAppointmentController(
  createAppointmentUseCase
)

export { createAppointmentUseCase, createAppointmentController }