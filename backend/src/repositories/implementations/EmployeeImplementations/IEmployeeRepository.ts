import { EmployeeEntity } from "../../../entities/Employee";
export interface IEmployeeRepository  {
  save(employee: EmployeeEntity,userId:number): Promise<EmployeeEntity>;
}