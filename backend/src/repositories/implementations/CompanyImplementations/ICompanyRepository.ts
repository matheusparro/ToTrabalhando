import { CompanyEntity } from "../../../entities/Company";
import {UserEntity} from "../../../entities/User";
import { PrismaClient } from "@prisma/client";
export interface ICompanyRepository  {

  save(company: CompanyEntity): Promise<CompanyEntity>;
}