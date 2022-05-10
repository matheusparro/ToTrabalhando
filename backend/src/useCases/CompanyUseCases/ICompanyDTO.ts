interface ICompanyDTO {
  cnpj: string;
  fantasyName:string
  email:string,
  isAdmin:boolean,
  password:string,

}

interface ICompanyUpdatePassword{
  id: number;
  cnpj: string;
  fantasyName:string;
}
export {ICompanyDTO,ICompanyUpdatePassword}
