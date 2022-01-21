import { MailtrapMailProvider } from "../../../providers/implementations/MailtrapMailProvider";
import { PostgresCompaniesRepository } from "../../../repositories/implementations/CompanyImplementations/PostgresCompaniesRepository";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";
import { CreateCompanyController } from "./CreateCompanyController";

const postgresCompaniesRepository = new PostgresCompaniesRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const createCompanyUseCase = new CreateCompanyUseCase(
  postgresCompaniesRepository,
)

const createCompanyController = new CreateCompanyController(
  createCompanyUseCase
)

export { createCompanyUseCase, createCompanyController }