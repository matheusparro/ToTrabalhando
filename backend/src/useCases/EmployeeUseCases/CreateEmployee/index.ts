import { PostgresCompaniesRepository } from "../../../repositories/implementations/EmployeeImplementations/PostgresEmployeeRepository";
import { PostgresUsersRepository } from "../../../repositories/implementations/UserImplementations/PostgresUsersRepository";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";
import { CreateEmployeeController } from "./CreateEmployeeController";

const postgresCompaniesRepository = new PostgresCompaniesRepository()
const postgresUsersRepository = new PostgresUsersRepository()
const createEmployeeUseCase = new CreateEmployeeUseCase(
  postgresUsersRepository,postgresCompaniesRepository,
)

const createEmployeeController = new CreateEmployeeController(
  createEmployeeUseCase
)

export { createEmployeeUseCase, createEmployeeController }