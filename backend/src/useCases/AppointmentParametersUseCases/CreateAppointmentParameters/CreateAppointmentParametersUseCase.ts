import { AppointmentParametersEntity } from "../../../entities/AppointmentParameters";
import { IAppointmentParametersRepository } from "../../../repositories/implementations/AppointmentParametersImplementations/IAppointmentParametersRepository";
import { IAppointmentParametersDTO } from "../IAppointmentParametersDTO";

export class CreateAppointmentParametersUseCase {
  constructor(
    private appointmentParametersRepository: IAppointmentParametersRepository,

  ) {}

  async execute(data: IAppointmentParametersDTO) {
    const newAppointmentParameters = new AppointmentParametersEntity({
      startMorningTime: data.startMorningTime,
      endMorningTime: data.endMorningTime,
      startAfterTime: data.startAfterTime,
      endAfterTime: data.endAfterTime
    
    }) 
    const appointmentParametersCreated = await this.appointmentParametersRepository.save(newAppointmentParameters)
    if (!appointmentParametersCreated){
      throw new Error('AppointmentParameters not created')
    }
    return appointmentParametersCreated
  }
}