import { Request, Response } from "express";
import { AppointmentParameterUserUseCase } from "./AppointmentParameterUserUseCase";

export class AppointmentParameterUserController {
  constructor(
    private appointmentParameterUserUseCase: AppointmentParameterUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {userId,appointmentParametersId} = request.params;
    try {
      await this.appointmentParameterUserUseCase.execute({
        userId:parseInt(userId),
        appointmentParametersId:parseInt(appointmentParametersId)
      })
      return response.status(201).send();  
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}