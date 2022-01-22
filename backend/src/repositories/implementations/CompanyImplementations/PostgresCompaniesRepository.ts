import { PrismaClient } from "@prisma/client";
import { CompanyEntity } from "../../../entities/Company";
import { ICompanyRepository } from "./ICompanyRepository";

export class PostgresCompaniesRepository implements ICompanyRepository{
  constructor(
    private prisma = new PrismaClient()
  ){}
  save(company: CompanyEntity): Promise<CompanyEntity> {
    throw new Error("Method not implemented.");
  }

  
}
