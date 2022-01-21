interface IUserDTO {
  name: string;
  email:string
  password: string;
}

interface IUserUpdatePassword{
  id: number;
  oldPassword: string;
  newPassword:string;
}
export {IUserDTO,IUserUpdatePassword}
