import { IAppointmentRepository } from "../../../repositories/implementations/AppointmentImplementations/IAppointmentRepository";

import { AppointmentEntity } from "../../../entities/Appointment";

export class CreateAppointmentUseCase {
  constructor(

    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(data: AppointmentEntity) {

    const appointmentCreated = await this.appointmentRepository.save(data);

    if (!appointmentCreated){
      throw new Error('Appointment not created.');
    }

  }
}