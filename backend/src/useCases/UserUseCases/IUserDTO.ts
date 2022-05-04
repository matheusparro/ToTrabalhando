interface IUserDTO {
  name: string;
  email:string
  password: string;
  isAdmin: boolean
  Avatar?: string
  departmentId?: number;
  permissionsID?: number;
  companyId:number
}

interface IUserUpdatePassword{
  id: number;
  oldPassword: string;
  newPassword:string;
}

interface IAppointmentParameterUser{
  userId:number;
  appointmentParametersId:number;

}
export {IUserDTO,IUserUpdatePassword,IAppointmentParameterUser}
