import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import {authenticateUserController } from "./useCases/authenticateUser/";
import { createCompanyController } from "./useCases/CompanyUseCases/CreateCompany";
import { refreshTokenUserController } from "./useCases/RefreshToken";
import { createUserController } from "./useCases/UserUseCases/CreateUser";



const router = Router()

router.post('/users', (request, response) => {
  return createUserController.handle(request, response);
});

router.post('/auth', (request, response) => {
  return authenticateUserController.handle(request, response);
});

router.post('/refresh-token', (request, response) => {
  return refreshTokenUserController.handle(request, response);
});

router.post('/users/:id/company', ensureAuthenticated,(request, response) => {
  return createCompanyController.handle(request, response);
});


export { router }