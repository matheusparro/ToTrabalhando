import { AppointmentEntity } from "../../../entities/Appointment";
export interface IAppointmentRepository  {
  save(appointmentEntity: AppointmentEntity): Promise<AppointmentEntity>;
}