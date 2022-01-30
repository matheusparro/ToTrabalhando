import { sign } from "jsonwebtoken";

export class GenerateTokenProvider{
  async execute(userId:number){
    const token = sign({},'1f6ef3008b9fe8894fa1f0ae5c73d033',{
      subject:String(userId),
      expiresIn:'1000s'
    })
    return token
  }
}