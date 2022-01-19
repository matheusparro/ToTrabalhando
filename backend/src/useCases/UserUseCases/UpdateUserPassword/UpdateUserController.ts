import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  constructor(
    private UpdateUserUseCase: UpdateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, newPassword,oldPassword } = request.body;

    try {
      await this.UpdateUserUseCase.execute({

        email,
        newPassword,
        oldPassword
      })
  
      return response.status(200).send();  
    } catch (err) {
      return response.status(404).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}