import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {  email, password } = request.body;

    try {
      const {token,refreshToken} = await this.authenticateUserUseCase.execute({
        email, password
      })
  
      return response.status(201).json({token,refreshToken});  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}