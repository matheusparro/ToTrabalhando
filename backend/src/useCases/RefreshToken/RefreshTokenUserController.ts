import { Request, Response } from "express";
import { RefreshTokeUserUseCase } from "./RefreshTokenUserUseCase";

export class RefreshTokenUserController {
  constructor(
    private refreshTokeUserUseCase: RefreshTokeUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.body;

    try {
      const token = await this.refreshTokeUserUseCase.execute(
        parseInt(refreshToken)
      )
  
      return response.status(201).json({token});  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}