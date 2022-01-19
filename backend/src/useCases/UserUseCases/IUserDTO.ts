interface IUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IUserUpdatePassword{
  email: string;
  oldPassword: string;
  newPassword:string;
}
export {IUserDTO,IUserUpdatePassword}
