import { PostgresAuthenticationRepository } from "../../repositories/implementations/AuthenticationImplementations/PostgresAuthenticationRepository"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AuthenticateUserController } from "./AuthenticateUserController";

const postgresAuthenticationRepository = new PostgresAuthenticationRepository()

const authenticateUserUseCase = new AuthenticateUserUseCase(
  postgresAuthenticationRepository,
)

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
)

export { authenticateUserUseCase, authenticateUserController }