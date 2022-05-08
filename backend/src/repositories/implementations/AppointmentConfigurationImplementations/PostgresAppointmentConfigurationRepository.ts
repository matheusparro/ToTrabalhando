import { EmployeeEntity } from "../../../entities/Employee";
import { IAppointmentConfigurationRepository } from "./IAppointmentConfigurationRepository";
import { PrismaClient } from "@prisma/client";
import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";
export class PostgresAppointmentConfigurationRepository implements IAppointmentConfigurationRepository {
  constructor(
    private prisma = new PrismaClient(),
  ) { }
  async save(appointmentConfigurationEntity: AppointmentConfigurationEntity): Promise<AppointmentConfigurationEntity> {
    try {
      const appointmentConfigurationCreated = await this.prisma.appointmentConfiguration.create({
        data:appointmentConfigurationEntity
      })
      return appointmentConfigurationCreated
    } catch (error) {
      return error.message
    }
   
  }
}


