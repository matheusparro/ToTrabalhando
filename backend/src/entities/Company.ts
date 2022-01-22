import { Company } from '@prisma/client';

export class CompanyEntity implements Company{
  id: number;
  cpnj: string;
  userId: number;
  fantasyName: string;

  constructor(props: Omit<CompanyEntity,'id'>) {
    Object.assign(this,props);
  }
 



}