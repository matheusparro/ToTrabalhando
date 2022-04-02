import { PrismaClient } from "@prisma/client";
import { CompanyEntity } from "../../../entities/Company";
import { UserEntity } from "../../../entities/User";
import { client } from "../../../prisma/client";
import { ICompanyRepository } from "./ICompanyRepository";

export class PostgresCompaniesRepository implements ICompanyRepository {
  constructor(
    private prisma = new PrismaClient()
  ) { }
  async save(company: CompanyEntity, user: UserEntity): Promise<CompanyEntity> {
    try {
      const prisma = new PrismaClient()
    const result = await prisma.$transaction(async (prisma: PrismaClient) => {
      const companyCreated = await prisma.company.create({
        data: {
          cnpj: company.cnpj,
          fantasyName: company.fantasyName,
        }
      })

      const userCreated = await prisma.user.create({
        data: user
      })

      await prisma.companyEmployers.create({
        data: {
          companyId: companyCreated.id,
          userId: userCreated.id,
        }
      })
      return companyCreated
    })
    return result
    } catch (error) {
      return null
    }
    
  }

  async find(id:number){
    try {
      const company = await client.company.findUnique({
        where: {
          id
        }
      })
      return company
    } catch (error) {
      return null
    }
  }
}
