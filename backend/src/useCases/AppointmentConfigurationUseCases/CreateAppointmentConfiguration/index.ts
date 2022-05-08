import { PostgresCompaniesRepository } from "../../../repositories/implementations/EmployeeImplementations/PostgresEmployeeRepository";
import { PostgresAppointmentConfigurationRepository } from "../../../repositories/implementations/AppointmentConfigurationImplementations/PostgresAppointmentConfigurationRepository";
import { CreateAppointmentConfigurationUseCase } from "./CreateAppointmentConfigurationUseCase";
import { CreateAppointmentConfigurationController } from "./CreateAppointmentConfigurationController";

const postgresAppointmentConfigurationRepository = new PostgresAppointmentConfigurationRepository()
const createAppointmentConfigurationUseCase = new CreateAppointmentConfigurationUseCase(
  postgresAppointmentConfigurationRepository
)

const createAppointmentConfigurationController = new CreateAppointmentConfigurationController(
  createAppointmentConfigurationUseCase
)

export { createAppointmentConfigurationUseCase, createAppointmentConfigurationController }