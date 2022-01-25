import { AppointmentParameters } from '@prisma/client';

export class AppointmentParametersEntity implements AppointmentParameters{
  id: number;
  startMorningTime: number;
  endMorningTime: number;
  startAfterTime: number;
  endAfterTime: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Omit<AppointmentParametersEntity,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);
  }
 
}