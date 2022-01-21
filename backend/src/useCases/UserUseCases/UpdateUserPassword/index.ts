import { MailtrapMailProvider } from "../../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../../repositories/implementations/UserImplementations/PostgresUsersRepository";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { UpdateUserController } from "./UpdateUserController";

const postgresUsersRepository = new PostgresUsersRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const updateUserUseCase = new UpdateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider,
)

const updateUserController = new UpdateUserController(
  updateUserUseCase
)

export { updateUserUseCase, updateUserController }