import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
  let routes: Router = Router();
  let controller: UsersController = new UsersController();

  routes.get('/users', controller.list);

  routes.get('/users/:id', controller.find)

  routes.post('/users/',controller.create)

  routes.put('/users/:id', controller.edit);

  routes.delete('/users/:id', controller.delete);

export default routes;

