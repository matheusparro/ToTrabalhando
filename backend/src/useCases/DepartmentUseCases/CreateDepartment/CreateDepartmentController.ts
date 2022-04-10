import { Request, Response } from "express";
import { CreateDepartmentUseCase } from "./CreateDepartmentUseCase";

export class CreateDepartmentController {
  constructor(
    private createDepartmentUseCase: CreateDepartmentUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.params;
    const { name } = request.body;
    if(!companyId) return response.status(404).send("Empresa inválida")
    if(!name) return response.status(404).send("Nome do departamento inválido")
    try {
      const departmentCreated = await this.createDepartmentUseCase.execute(parseInt(companyId),name)
  
      return response.status(201).json(departmentCreated);
    } catch (err) {
      return response.status(404).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}