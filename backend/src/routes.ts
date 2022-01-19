import { Router } from "express";
import { createUserController } from "./useCases/UserUseCases/CreateUser";
import { updateUserController } from "./useCases/UserUseCases/UpdateUserPassword";


const router = Router()

router.post('/users', (request, response) => {
  return createUserController.handle(request, response);
});

router.put('/users', (request, response) => {
  return updateUserController.handle(request, response);
})

export { router }