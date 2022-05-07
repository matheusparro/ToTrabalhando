import { Request, Response } from "express";
import { EmployeeEntity } from "../../../entities/Employee";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

export class CreateEmployeeController {
  constructor(
    private createEmployeeUseCase: CreateEmployeeUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, pis ,departmentId,appointmentConfigurationId,userId} = request.body;

  
    try {
      const employeeCreated = new EmployeeEntity({
       appointmentConfigurationId,
       cpf,
       departmentId,
       name,
       pis
      })
      await this.createEmployeeUseCase.execute(employeeCreated,parseInt(userId))
  
      return response.status(201).send();  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}