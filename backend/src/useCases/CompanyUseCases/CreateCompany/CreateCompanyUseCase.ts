import { ICompanyRepository } from "../../../repositories/implementations/CompanyImplementations/ICompanyRepository";
import { ICompanyDTO } from "../ICompanyDTO";

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,

  ) {}

  async execute(data: ICompanyDTO) {
    

   
  }
}