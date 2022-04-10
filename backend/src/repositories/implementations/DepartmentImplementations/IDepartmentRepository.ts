import { DepartmentEntity } from "../../../entities/Department";
export interface IDepartmentRepository  {

  save(department: DepartmentEntity,): Promise<DepartmentEntity>;

}