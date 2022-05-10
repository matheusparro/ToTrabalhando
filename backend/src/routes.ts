import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { authenticateUserController } from "./useCases/AuthenticateUser";
import { createCompanyController } from "./useCases/CompanyUseCases/CreateCompany";
import { refreshTokenUserController } from "./useCases/RefreshToken";
import { createUserController } from "./useCases/UserUseCases/CreateUser";
import { findUserController } from "./useCases/UserUseCases/FindUser";
import { setUserPermissionController } from "./useCases/UserUseCases/SetUserPermission";
import { createDepartmentController } from "./useCases/DepartmentUseCases/CreateDepartment";
//import { setUserDepartmentController } from "./useCases/UserUseCases/SetUserDepartment";
import { createEmployeeController } from "./useCases/EmployeeUseCases/CreateEmployee";
import {  createAppointmentConfigurationController } from "./useCases/AppointmentConfigurationUseCases/CreateAppointmentConfiguration";
import multer from "multer";

//Middleware de Upload para o Avatar
import { uploadAvatar } from "./middleware/userAvatar"
import { findCompanyController } from "./useCases/CompanyUseCases/FindCompany";
import { is } from "./middleware/validatePermissions";
import { deleteUserController } from "./useCases/UserUseCases/DeleteUser";

const router = Router()

router.post('/teste', multer(uploadAvatar.getConfig).single("userAvatar"), (req, res) => {
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

router.post('/users', multer(uploadAvatar.getConfig).single("userAvatar"), ensureAuthenticated, is(['manager', 'admin']), (request, response) => {
  return createUserController.handle(request, response);
});

router.get('/users/:id', (request, response) => {
  return findUserController.handle(request, response);
});

router.delete('/users/:userId', (request, response) => {
  return deleteUserController.handle(request, response);
});


router.post('/auth', (request, response) => {
  console.log("hello")
  return authenticateUserController.handle(request, response);
});

router.post('/refresh-token', (request, response) => {
  return refreshTokenUserController.handle(request, response);
});

router.post('/company', (request, response) => {
  return createCompanyController.handle(request, response);
});


router.get('/company/:id', ensureAuthenticated, is(['manager', 'admin']), (request, response) => {
  return findCompanyController.handle(request, response);
});

router.post('/users/permission/set-permission', ensureAuthenticated, is(['manager', 'admin']), (request, response) => {
  return setUserPermissionController.handle(request, response);
});

// router.post('/company/:companyId/department/:departmentId/set-department',ensureAuthenticated,is(['manager']),(request, response) => {
//   return setUserDepartmentController.handle(request, response);
// });
router.post('/company/:companyId/department', ensureAuthenticated, is(['manager', 'admin']), (request, response) => { // CRIAR UM DEPARTAMENTO
  return createDepartmentController.handle(request, response);
});

router.post('/employee', (request, response) => {
  return createEmployeeController.handle(request, response);
});

router.post('/appointment-configuration', (request, response) => {
  return createAppointmentConfigurationController.handle(request, response);
});

export { router }