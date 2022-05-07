import { IAuthenticationRepository } from "../../repositories/implementations/AuthenticationImplementations/IAuthenticationRepository";
import { GenerateRefreshToken } from "../../providers/implementations/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../providers/implementations/GenerateTokenProvider";

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
  
    const generateTokenProvider = new GenerateTokenProvider()

    const token = await generateTokenProvider.execute(userFind.id)
    const generateRefreshToken = new GenerateRefreshToken()
    
    const refreshToken = await generateRefreshToken.execute(userFind.id)
    return {token,refreshToken}
  }


}