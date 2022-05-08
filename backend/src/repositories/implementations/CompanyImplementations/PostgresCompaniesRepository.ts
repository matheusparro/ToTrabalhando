import { PrismaClient } from "@prisma/client";
import { CompanyEntity } from "../../../entities/Company";
import { UserEntity } from "../../../entities/User";
import { client } from "../../../prisma/client";
import { ICompanyRepository } from "./ICompanyRepository";
import { PermissionsEntity } from "../../../entities/Permissions";
export class PostgresCompaniesRepository implements ICompanyRepository {
  constructor(
    private prisma = new PrismaClient(),
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
      
       
        const createPermissionAdmin= await prisma.permissions.create({
          data: 
            { name:"admin",description: 'Admin', companyId:companyCreated.id},
        })
        const createManyPermissions = await prisma.permissions.createMany({
          data: [
            { name:"manager",description: 'Gerente', companyId:companyCreated.id }, // Duplicate unique key!
            { name:"employer", description: 'Funcionário', companyId:companyCreated.id },
          ],
          skipDuplicates: true, // Skip 'Bobo'
        })
        const userCreated = await prisma.user.create({
          data:{
            password:user.password,
            email:user.email,
            Avatar:user.Avatar,
            companyId:companyCreated.id,
            permissionsID:createPermissionAdmin.id,
         }
        })
        return companyCreated
      })
      return result
    } catch (error) {
      return null
    }

  }

  async find(id: number) {
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


