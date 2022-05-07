import { EmployeeEntity } from "../../../entities/Employee";
import { IEmployeeRepository } from "./IEmployeeRepository";
import { PrismaClient } from "@prisma/client";
export class PostgresCompaniesRepository implements IEmployeeRepository {
  constructor(
    private prisma = new PrismaClient(),
  ) { }
  async save(employee: EmployeeEntity,userId): Promise<EmployeeEntity> {
    try {
       const result = await this.prisma.$transaction(async (prisma: PrismaClient) => {
          const employeeCreated = await prisma.employee.create({
            data:employee
          })

          const userUpdated = await prisma.user.update({
            where:{id:userId},
            data:{
              employeeId:employeeCreated.id
            }
          })
          return employeeCreated
      })
      return result
    }catch (err) {
      throw new Error(err);
    }
  }
  
}


