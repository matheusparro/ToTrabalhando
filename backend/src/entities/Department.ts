import { Department } from '@prisma/client';

export class DepartmentEntity implements Department{
 
  public id: number;
  public name: string;
  public companyId: number;
  public createdAt: Date;
  public updatedAt: Date;
  
  constructor(props: Omit<DepartmentEntity,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);
  }




}