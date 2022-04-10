import { PostgresDepartmentRepository } from "../../../repositories/implementations/DepartmentImplementations/PostgresDepartmentRepository";
import { CreateDepartmentUseCase } from "./CreateDepartmentUseCase";
import { CreateDepartmentController } from "./CreateDepartmentController";

const postgresUsersRepository = new PostgresDepartmentRepository()

const createDepartmentUseCase = new CreateDepartmentUseCase(
  postgresUsersRepository,
)

const createDepartmentController = new CreateDepartmentController(
  createDepartmentUseCase
)

export { createDepartmentUseCase, createDepartmentController }