import {NextFunction,Response,Request} from 'express'
import {verify} from 'jsonwebtoken'
export function ensureAuthenticated(request:Request,response:Response,next:NextFunction){
  const authToken = request.headers.authorization
  if(!authToken){
    return response.status(401).json({message:"Token is missing"})

  }
  const [,token] = authToken.split(" ")
  try {
    verify(token,"1f6ef3008b9fe8894fa1f0ae5c73d033")

    return next()
  } catch (error) {
    return response.status(401).json({message:"Token invalid"})
  }
}