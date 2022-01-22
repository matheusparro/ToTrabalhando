import dayjs from "dayjs";
import { client } from "../../../prisma/client";
import { GenerateRefreshToken } from "../../../providers/implementations/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../../providers/implementations/GenerateTokenProvider";
import { IRefreshTokenRepository } from "./IRefreshTokenRepository";

export class PostgresRefreshTokenRepository implements IRefreshTokenRepository {
  async verify(refreshToken: number): Promise<Object> {
    const refreshTokenFounded = await client.refreshToken.findFirst({
      where: {id:refreshToken}
    })

    if (!refreshTokenFounded){
     return null
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshTokenFounded.expiresIn))

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(refreshTokenFounded.userId)


    if (refreshTokenExpired){
      const generateRefreshToken = new GenerateRefreshToken()
    
      const newRefreshToken = await generateRefreshToken.execute(refreshTokenFounded.userId)
      return {token,newRefreshToken}
    }
    
    return token
  }
}
