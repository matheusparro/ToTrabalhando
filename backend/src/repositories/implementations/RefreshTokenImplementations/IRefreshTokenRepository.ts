export interface IRefreshTokenRepository {
  verify(refreshToken:number):Promise<Object>
}
