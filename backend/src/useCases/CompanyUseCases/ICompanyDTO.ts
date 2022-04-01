interface ICompanyDTO {
  cnpj: string;
  fantasyName:string

}

interface ICompanyUpdatePassword{
  id: number;
  cnpj: string;
  fantasyName:string;
}
export {ICompanyDTO,ICompanyUpdatePassword}
