import { Request, Response } from "express";
import { CreateAppointmentParametersUseCase } from "./CreateAppointmentParametersUseCase";

export class CreateAppointmentParametersController {
  constructor(
    private createAppointmentParametersUseCase: CreateAppointmentParametersUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {startMorningTime,
      endMorningTime,
      startAfterTime,
      endAfterTime} = request.body;

    try {
      const appointmentParametersCreated = await this.createAppointmentParametersUseCase.execute({
        startMorningTime:new Date(startMorningTime),
      endMorningTime:new Date(startMorningTime),
      startAfterTime:new Date(startMorningTime),
      endAfterTime:new Date(startMorningTime),  
      })
  
      return response.status(201).json(appointmentParametersCreated);  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}