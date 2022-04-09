import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password ,isAdmin} = request.body;
    var val = (isAdmin === "true");
    // if (!request.file){
     
    //   return response.status(400).json({error:"ERROR - Send avatar image"});  
    // } 
    try {
     
      await this.createUserUseCase.execute({
        name,
        email,
        password,
        isAdmin:val,
        Avatar:request.file ?request.file.path :null
      })
  
      return response.status(201).send();  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}