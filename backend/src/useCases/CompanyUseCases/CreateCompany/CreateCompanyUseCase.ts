import { CompanyEntity } from "../../../entities/Company";
import { ICompanyRepository } from "../../../repositories/implementations/CompanyImplementations/ICompanyRepository";
import { ICompanyDTO } from "../ICompanyDTO";

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,

  ) {}

  async execute(data: ICompanyDTO) {
    const newCompany = new CompanyEntity({
      cpnj:data.cnpj,
      fantasyName:data.fantasyName,
      

    }) 
    const companyCreated = await this.companyRepository.save(newCompany)
    if (!companyCreated){
      throw new Error('Company not created')
    }
    return companyCreated
   
  }
}