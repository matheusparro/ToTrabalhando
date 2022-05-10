import { Appointment } from '@prisma/client';

export class AppointmentEntity implements Appointment{

  constructor(props: Omit<Appointment,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);
  }
  appointmentTime: Date;
    id: number;
    departmentId: number;
    employeeId: number;
    createdAt: Date;
    updatedAt: Date;

}