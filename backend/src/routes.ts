import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { createAppointmentParametersController } from "./useCases/AppointmentParametersUseCases/CreateAppointmentParameters";
import {authenticateUserController } from "./useCases/AuthenticateUser/";
import { createCompanyController } from "./useCases/CompanyUseCases/CreateCompany";
import { refreshTokenUserController } from "./useCases/RefreshToken";
import { createUserController } from "./useCases/UserUseCases/CreateUser";
import multer from "multer";

//Middleware de Upload para o Avatar
import { uploadAvatar } from "./middleware/userAvatar"

const router = Router()

router.post('/teste',multer(uploadAvatar.getConfig).single("userAvatar"),(req, res) => {
  if (req.file) {
    //Se ele existir, retornamos um sucess com o payload do arquivo gerado
    //Aqui sua criatividade é o limite
    return res.json({
      response: req.file,
    });
  }

  //Caso não seja um arquivo validado, retornamos o status 409
  //Doc para o status: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/409
  res.status(409);

  //E retornamos uma msg para o usuário final: Não é um tipo de arquivo válido
  return res.json({
    response: `Não é um tipo de arquivo válido`,
  });
})

router.post('/users',multer(uploadAvatar.getConfig).single("userAvatar"), (request, response) => {
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

router.post('/appointment-parameters', ensureAuthenticated,(request, response) => {
  return createAppointmentParametersController.handle(request, response);
});


export { router }