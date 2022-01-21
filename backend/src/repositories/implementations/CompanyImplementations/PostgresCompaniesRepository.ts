import { PrismaClient } from "@prisma/client";
import { CompanyEntity } from "../../../entities/Company";
import { UserEntity } from "../../../entities/User";
import { ICompanyRepository } from "./ICompanyRepository";

export class PostgresCompaniesRepository implements ICompanyRepository{
  constructor(
    private prisma = new PrismaClient()
  ){}
  async save(company: CompanyEntity): Promise<CompanyEntity> {
    const companyCreated =  await this.prisma.company.create({
      data:{
        cpnj: company.cpnj,
        userId: company.userId,
       }
     })
    return companyCreated
  }
  
}
