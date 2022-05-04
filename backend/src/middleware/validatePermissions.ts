import { NextFunction, Request, Response } from "express";
import  { decode,verify } from 'jsonwebtoken'
import { IUsersRepository } from "../repositories/implementations/UserImplementations/IUsersRepository";
import { PostgresUsersRepository } from "../repositories/implementations/UserImplementations/PostgresUsersRepository";
export function is(rolesRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request;
    const usersRepository:IUsersRepository= new PostgresUsersRepository()
    const user = await usersRepository.findUser(parseInt(userId))

    if (!user) {
      return response.status(400).json("User does not exists");
    }
    if (!user.permissions){
      return response.status(401).end();
    }
    const permissionExist = rolesRoutes.includes(user.permissions.name)

    if (!permissionExist) {
      return response.status(401).end();
    }

    return next();
  };
}