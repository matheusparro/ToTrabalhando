import {  AppointmentParametersOnUsers } from '@prisma/client';
export class AppointmentParametersOnUsersEntity implements AppointmentParametersOnUsers{
  userId: number;
  appointmentParametersId: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(props) {
    Object.assign(this,props);
  }

}