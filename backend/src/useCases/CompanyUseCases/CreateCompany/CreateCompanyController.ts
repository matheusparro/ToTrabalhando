import { Request, Response } from "express";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

export class CreateCompanyController {
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.params.id as unknown as number
    const { cnpj, fantasyName} = request.body;

    try {
      await this.createCompanyUseCase.execute({
        
        cnpj,
        fantasyName,
        userId
      })
  
      return response.status(201).send();  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}