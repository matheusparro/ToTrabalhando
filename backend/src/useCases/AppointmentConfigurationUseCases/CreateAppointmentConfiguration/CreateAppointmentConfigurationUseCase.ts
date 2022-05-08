import { IAppointmentConfigurationRepository } from "../../../repositories/implementations/AppointmentConfigurationImplementations/IAppointmentConfigurationRepository";

import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";

export class CreateAppointmentConfigurationUseCase {
  constructor(
    private appointmentConfigurationRepository: IAppointmentConfigurationRepository
  ) {}

  async execute(data: AppointmentConfigurationEntity) {
  
  
    const appointmentConfiguration = await this.appointmentConfigurationRepository.save(data);

    if (!appointmentConfiguration){
      throw new Error('Appointment Configuration not created.');
    }

  }
}