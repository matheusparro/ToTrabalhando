import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import {authenticateUserController } from "./useCases/authenticateUser/";
import { createUserController } from "./useCases/UserUseCases/CreateUser";



const router = Router()

router.post('/users', (request, response) => {
  return createUserController.handle(request, response);
});

router.post('/auth', (request, response) => {
  return authenticateUserController.handle(request, response);
});

router.get('/teste', ensureAuthenticated,(request, response) => {
  return response.json({message:"Oi amanda"})
});


export { router }