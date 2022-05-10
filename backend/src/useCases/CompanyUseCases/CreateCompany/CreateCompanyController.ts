import { Request, Response } from "express";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

export class CreateCompanyController {
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const userId = parseInt(request.params.id)
    const { 
      cnpj, 
      fantasyName,
      email,
      isAdmin,
      password 
    } = request.body;

    try {
      const companyCreated = await this.createCompanyUseCase.execute({
        cnpj,
        fantasyName,
        email,
        isAdmin,
        password

      })

      return response.status(201).json(companyCreated);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}