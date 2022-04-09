import { PostgresUsersRepository } from "../../../repositories/implementations/UserImplementations/PostgresUsersRepository";
import { SetUserPermissionUseCase } from "./SetUserPermissionUseCase";
import { SetUserPermissionController } from "./SetUserPermissionController";

const postgresUsersRepository = new PostgresUsersRepository()

const setUserPermissionUseCase = new SetUserPermissionUseCase(
  postgresUsersRepository,
)

const setUserPermissionController = new SetUserPermissionController(
  setUserPermissionUseCase
)

export { setUserPermissionUseCase, setUserPermissionController }