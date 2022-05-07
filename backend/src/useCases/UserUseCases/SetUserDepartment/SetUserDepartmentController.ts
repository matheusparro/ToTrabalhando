// import { Request, Response } from "express";
// import { SetUserDepartmentUseCase } from "./SetUserDepartmentUseCase";

// export class SetUserDepartmentController {
//   constructor(
//     private setUserDepartmentUseCase: SetUserDepartmentUseCase,
//   ) {}

//   async handle(request: Request, response: Response): Promise<Response> {
//     const { userId,departmentId } = request.params;

    
//     try {
//       const userFounded = await this.setUserDepartmentUseCase.execute(parseInt(userId),parseInt(departmentId))
  
//       return response.status(201).json(userFounded);
//     } catch (err) {
//       return response.status(400).json({
//         message: err.message || 'Unexpected error.'
//       })
//     }
//   }
// }