import { DepartmentEntity } from "../../../entities/Department";
import { IDepartmentRepository } from "../../../repositories/implementations/DepartmentImplementations/IDepartmentRepository";

export class CreateDepartmentUseCase {
  constructor(
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute(companyId: number,name:string) {
    const department = new DepartmentEntity({
      companyId,
      name
    })

    const departmentCreated = await this.departmentRepository.save(department)
   
    if(!departmentCreated) return new Error("I rapaz")
    return departmentCreated
  }
}