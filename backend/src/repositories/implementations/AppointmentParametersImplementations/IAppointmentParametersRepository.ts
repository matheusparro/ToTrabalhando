import { AppointmentParameters } from "@prisma/client";

export interface IAppointmentParametersRepository {
  save(appointmentParameters:AppointmentParameters):Promise<AppointmentParameters>
}
