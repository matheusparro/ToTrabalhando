import { CompanyEntity } from "../../../entities/Company";
import { UserEntity } from "../../../entities/User";
import { ICompanyRepository } from "../../../repositories/implementations/CompanyImplementations/ICompanyRepository";
import { ICompanyDTO } from "../ICompanyDTO";

export class FindCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,

  ) {}

  async execute(id: number) {
  
    const companyCreated = await this.companyRepository.find(id)
    if (!companyCreated){
      throw new Error('Company not found')
    }
    return companyCreated
   
  }
}