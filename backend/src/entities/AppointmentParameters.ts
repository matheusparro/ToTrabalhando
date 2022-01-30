import { AppointmentParameters } from '@prisma/client';

export class AppointmentParametersEntity implements AppointmentParameters{


  constructor(props: Omit<AppointmentParametersEntity,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);
  }
  id: number;
  startMorningTime: Date;
  endMorningTime: Date;
  startAfterTime: Date;
  endAfterTime: Date;
  createdAt: Date;
  updatedAt: Date;

 
}