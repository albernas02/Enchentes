import { NextFunction, Router, Request, Response } from "express";
import { UsersController } from "../controllers/UsersController";
import * as yup from 'yup';
import { User } from "../models/User";

async function validatePayload(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
      name: yup.string().min(3).max(255).required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).max(16).required(),
  })
  let payload = req.body;

  try{
      req.body = await schema.validate(payload, {abortEarly: false, stripUnknown: true});
      next();
  }catch(error){
      if(error instanceof yup.ValidationError){
          console.log(error)
          return res.status(400).json({errors: error.errors});
      }
      return res.status(500).json({error: 'Ops algo deu errado'});
  }
return res.status(200);
}

async function validateUser(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
  let id = Number(req.params.id);
  let user: User| null = await User.findOneBy({id});
  if(!user){
      return res.status(422).json({error: "user not found"});
  }
  res.locals.user = user;

  return next();
}

  let routes: Router = Router();
  let controller: UsersController = new UsersController();

  routes.get('/users', controller.list);

  routes.get('/users/:id', validateUser, controller.find)

  routes.post('/users/', validatePayload, controller.create)

  routes.put('/users/:id', validateUser, validatePayload, controller.edit);

  routes.delete('/users/:id',validateUser, controller.delete);

export default routes;

