import { client } from "../../../prisma/client";
import { IAppointmentParametersRepository } from "./IAppointmentParametersRepository";
import { AppointmentParameters } from "@prisma/client";
export class PostgresAppointmentParametersRepository implements IAppointmentParametersRepository {
  async save(appointmentParameters: AppointmentParameters): Promise<AppointmentParameters> {
    const appointmentParametersCreated = await client.appointmentParameters.create({data:appointmentParameters})
    return appointmentParametersCreated
    
  }

  


}