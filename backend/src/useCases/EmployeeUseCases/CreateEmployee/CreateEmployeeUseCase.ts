import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IEmployeeRepository } from "../../../repositories/implementations/EmployeeImplementations/IEmployeeRepository";

import { EmployeeEntity } from "../../../entities/Employee";

export class CreateEmployeeUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(data: EmployeeEntity,userId: number) {
    const userAlreadyExists = await this.usersRepository.findUser(userId);

    if (!userAlreadyExists) {
      throw new Error('User not exist.');
    }
  

    const employeeCreated = await this.employeeRepository.save(data,userId);

    if (!employeeCreated){
      throw new Error('User not created.');
    }

  }
}