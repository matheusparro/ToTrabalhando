import { IRefreshTokenRepository } from "../../repositories/implementations/RefreshTokenImplementations/IRefreshTokenRepository";

export class RefreshTokeUserUseCase {
  constructor(
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(refreshToken: number){
    const token = await this.refreshTokenRepository.verify(refreshToken)
    if (!token){
      throw new Error(' Refresh token invalid')
    }
    return token
  }
}