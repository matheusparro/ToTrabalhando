import { Company } from '@prisma/client';

export class CompanyEntity implements Company{
  id: number;
  cpnj: string;
  userId: number;
  fantasyName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Omit<UserEntity,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);
  }
 



}