interface IUserDTO {
  name: string;
  email:string
  password: string;
  isAdmin: boolean
  Avatar: string
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
