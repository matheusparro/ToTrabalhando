import { hash } from "bcrypt";
import { CompanyEntity } from "../../../entities/Company";
import { UserEntity } from "../../../entities/User";
import { ICompanyRepository } from "../../../repositories/implementations/CompanyImplementations/ICompanyRepository";
import { ICompanyDTO } from "../ICompanyDTO";

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,

  ) {}

  async execute(data: ICompanyDTO) {
    const newCompany = new CompanyEntity({
      cnpj:data.cnpj,
      fantasyName:data.fantasyName,
    })
    const newUser = new UserEntity({
      email:data.email,
      isAdmin:true,
      name:data.fantasyName,
      password:await hash(data.password,8),
      Avatar:null
    }) 
    const companyCreated = await this.companyRepository.save(newCompany,newUser)
    if (!companyCreated){
      throw new Error('Company not created')
    }
    return companyCreated
   
  }
}