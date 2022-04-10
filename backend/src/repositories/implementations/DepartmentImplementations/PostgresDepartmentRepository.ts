import { DepartmentEntity } from "../../../entities/Department";
import { client } from "../../../prisma/client";
import { IDepartmentRepository } from "./IDepartmentRepository";

export class PostgresDepartmentRepository implements IDepartmentRepository {
  async save(department: DepartmentEntity): Promise<DepartmentEntity> {

    const departmentFounded =  await client.department.findFirst({
      where:{
        companyId:department.companyId,
        name:department.name
      }
    })
    if(departmentFounded) throw new Error('Departamento já existe.')

    const departmentCreated = await client.department.create({
      data:department
    })
    return departmentCreated
  }

}


