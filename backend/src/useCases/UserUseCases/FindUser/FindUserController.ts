import { Request, Response } from "express";
import { FindUserUseCase } from "./FindUserUseCase";

export class FindUserController {
  constructor(
    private findUserUseCase: FindUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
 
    try {
      const userFounded = await this.findUserUseCase.execute(parseInt(userId))
  
      return response.status(201).json(userFounded);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}