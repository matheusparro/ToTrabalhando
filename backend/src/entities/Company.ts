import { Company } from '@prisma/client';

export class CompanyEntity implements Company{
  id: number;
  cnpj: string;
  fantasyName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Omit<CompanyEntity,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);
  }
 



}