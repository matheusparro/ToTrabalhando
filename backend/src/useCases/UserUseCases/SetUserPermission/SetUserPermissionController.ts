import { Request, Response } from "express";
import { SetUserPermissionUseCase } from "./SetUserPermissionUseCase";

export class SetUserPermissionController {
  constructor(
    private setUserPermissionUseCase: SetUserPermissionUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId,permissionId } = request.body;

    
    try {
      const userFounded = await this.setUserPermissionUseCase.execute(parseInt(userId),parseInt(permissionId))
  
      return response.status(201).json(userFounded);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}