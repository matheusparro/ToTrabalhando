interface IUserDTO {
  name: string;
  email:string
  password: string;
  isAdmin: boolean
}

interface IUserUpdatePassword{
  id: number;
  oldPassword: string;
  newPassword:string;
}
export {IUserDTO,IUserUpdatePassword}
