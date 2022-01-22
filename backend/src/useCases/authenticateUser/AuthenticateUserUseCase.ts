import { client } from "../../prisma/client";
import { IAuthenticationRepository } from "../../repositories/implementations/AuthenticationImplementations/IAuthenticationRepository";
import {sign} from "jsonwebtoken"
interface IRequest{
  email:string;
  password:string;
}
export class AuthenticateUserUseCase {
  constructor(
    private authenticationRepository: IAuthenticationRepository,
  ) {}
  async execute({email,password}: IRequest) {
    const userFind = await this.authenticationRepository.findToLogin(email, password)
    if (!userFind) {
      throw new Error(`Email or password incorrect`)
    }
    const token = sign({},'1f6ef3008b9fe8894fa1f0ae5c73d033',{
      subject:String(userFind.id),
      expiresIn:'20s'
    })
    
    return token
  }


}