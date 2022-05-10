import { EmployeeEntity } from "../../../entities/Employee";
import { IAppointmentRepository } from "./IAppointmentRepository";
import { PrismaClient } from "@prisma/client";
import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";
import { AppointmentEntity } from "../../../entities/Appointment";
export class PostgresAppointmentRepository implements IAppointmentRepository {
  constructor(
    private prisma = new PrismaClient(),
  ) { }
  async save(appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
    try {
      const appointmentConfigurationCreated = await this.prisma.appointment.create({
        data:appointmentEntity
      })
      return appointmentConfigurationCreated
    } catch (error) {
      return error.message
    }
  }
}



