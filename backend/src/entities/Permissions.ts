import { Permissions } from '@prisma/client';

export class PermissionsEntity implements Permissions{
  id: number;
  companyId: number;
  createdAt: Date;
  name: string;
  updatedAt: Date;
  description: string;
  constructor(props: Omit<PermissionsEntity,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);
  }
}