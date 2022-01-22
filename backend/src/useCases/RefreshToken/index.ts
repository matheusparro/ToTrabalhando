import { PostgresRefreshTokenRepository } from "../../repositories/implementations/RefreshTokenImplementations/PostgresRefreshTokenRepository"
import { RefreshTokeUserUseCase } from "./RefreshTokenUserUseCase";
import { RefreshTokenUserController } from "./RefreshTokenUserController";

const postgresRefreshTokenRepository = new PostgresRefreshTokenRepository()

const refreshTokeUserUseCase = new RefreshTokeUserUseCase(
  postgresRefreshTokenRepository,
)

const refreshTokenUserController = new RefreshTokenUserController(
  refreshTokeUserUseCase
)

export { refreshTokeUserUseCase, refreshTokenUserController }