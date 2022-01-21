interface ICompanyDTO {
  cnpj: string;
  fantasyName:string
  userId: number;
}

interface ICompanyUpdatePassword{
  id: number;
  cnpj: string;
  fantasyName:string;
}
export {ICompanyDTO,ICompanyUpdatePassword}
