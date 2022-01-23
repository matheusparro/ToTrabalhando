import {NextFunction,Response,Request} from 'express'
import jwt from 'jsonwebtoken'
interface RequestModify extends Request{
  userId:number | (()=>number)
}
export function ensureAuthenticated(request:RequestModify,response:Response,next:NextFunction){

  const authToken = request.headers.authorization
  if(!authToken){
    return response.status(401).json({message:"Token is missing"})

  }
  const [,token] = authToken.split(" ")
  try {
    jwt.verify(token,"1f6ef3008b9fe8894fa1f0ae5c73d033")
    request.userId  = Number(jwt.decode(token).sub)
    return next()
  } catch (error) {
    return response.status(401).json({message:"Token invalid"})
  }
}