import { Request, Response } from "express";
import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";
import { CreateAppointmentConfigurationUseCase } from "./CreateAppointmentConfigurationUseCase";

export class CreateAppointmentConfigurationController {
  constructor(
    private createAppointmentConfigurationUseCase: CreateAppointmentConfigurationUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { startTime, startTimeEnd, endTime, endTimeEnd } = request.body;
    const { companyId } = request.body

    try {
      const appointmentConfigurationEntityCreated = new AppointmentConfigurationEntity({
        
        endTime:new Date(endTime),
        endTimeEnd:new Date(endTimeEnd),
        startTime:new Date(startTime),
        startTimeEnd:new Date(startTimeEnd),
        companyId:parseInt(companyId)
      })
      await this.createAppointmentConfigurationUseCase.execute(appointmentConfigurationEntityCreated)

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}