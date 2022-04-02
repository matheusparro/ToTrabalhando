import { Request, Response } from "express";
import { FindCompanyUseCase } from "./FindCompanyUseCase";

export class FindCompanyController {
  constructor(
    private findCompanyUseCase: FindCompanyUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id)
    

    try {
      const companyFounded = await this.findCompanyUseCase.execute(id)

      return response.status(201).json(companyFounded);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}