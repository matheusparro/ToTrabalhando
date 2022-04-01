import { PrismaClient } from "@prisma/client";
import { CompanyEntity } from "../../../entities/Company";
import { client } from "../../../prisma/client";
import { ICompanyRepository } from "./ICompanyRepository";

export class PostgresCompaniesRepository implements ICompanyRepository{
  constructor(
    private prisma = new PrismaClient()
  ){}
 async save(company: CompanyEntity): Promise<CompanyEntity> {
   const companyCreated =  await client.company.create({
      data:{
        cpnj:company.cpnj,
        fantasyName:company.fantasyName,
      }
    })
    return companyCreated
  }
}
