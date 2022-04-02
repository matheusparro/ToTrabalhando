import { PostgresCompaniesRepository } from "../../../repositories/implementations/CompanyImplementations/PostgresCompaniesRepository";
import { FindCompanyUseCase } from "./FindCompanyUseCase";
import { FindCompanyController } from "./FindCompanyController";

const postgresCompaniesRepository = new PostgresCompaniesRepository()

const findCompanyUseCase = new FindCompanyUseCase(
  postgresCompaniesRepository,
)

const findCompanyController = new FindCompanyController(
  findCompanyUseCase
)

export { findCompanyUseCase, findCompanyController }