import { client } from "../../prisma/client";
import dayjs from 'dayjs'
export class GenerateRefreshToken{
  async execute(userId: number){
    await client.refreshToken.deleteMany({
      where:{userId}
    })
    const expiresIn = dayjs().add(1000,"second").unix()
    const generateRefreshToken = client.refreshToken.create({
      data:{
        userId,
        expiresIn
      }
    })
    return generateRefreshToken
  }
}