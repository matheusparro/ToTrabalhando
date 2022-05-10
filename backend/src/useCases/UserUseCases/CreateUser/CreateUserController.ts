import { Request, Response } from "express";
import { UserEntity } from "../../../entities/User";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {email, password, companyId,employeeId,faceId} = request.body;

    try {
      const userCreate = new UserEntity({
        Avatar:request.file ?request.file.path :null,
        companyId:parseInt(companyId),
        email,
        password,
        employeeId,
        permissionsID:null,
        faceId:faceId? faceId : null,
      })
      await this.createUserUseCase.execute(userCreate)
  
      return response.status(201).send();  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}