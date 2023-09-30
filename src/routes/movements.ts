import  express, {Express, Request, Response, Router, NextFunction} from "express";
import { MovementsController } from "../controllers/MovementsController";
import * as yup from 'yup';
import { Movement } from "../models/Movement";

async function validatePayload(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    userId: yup.string().max(255).required(),
    type: yup.string().required(),
    town: yup.string().max(255).required(),
    amount: yup.string().max(255).required(),
    itemId: yup.string().max(255).required(),
    recipientId: yup.string().max(255),
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

async function validateMovement(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
  let id = Number(req.params.id);
  let movement: Movement| null = await Movement.findOneBy({id});
  if(!movement){
      return res.status(422).json({error: "movement not found"});
  }
  res.locals.movement = movement;

  return next();
}

let routes: Router = Router();
let controller: MovementsController = new MovementsController();

  routes.get('/movements', controller.list);

  routes.get('/movements:id', validateMovement, controller.find);

  routes.post('/movements', validatePayload, controller.create);

  routes.put('/movements/:id', validateMovement, validatePayload, controller.edit);

  routes.delete('/movements/:id', controller.delete);

export default routes;

