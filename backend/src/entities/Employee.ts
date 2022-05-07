import { Employee } from '@prisma/client';
export class EmployeeEntity implements Employee{

  id: number;
  name: string;
  cpf: string;
  pis: string;
  departmentId: number;
  appointmentConfigurationId: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(props: Omit<EmployeeEntity,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);    
  }
}