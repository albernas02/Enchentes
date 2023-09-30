import {Router, Response, Request, NextFunction} from "express";
import { DcController } from "../controllers/DcsController";
import * as yup from 'yup';
import { Dc } from "../models/Dc";

async function validatePayload(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    town: yup.string().min(3).max(255).required(),
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

async function validateDc(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
  let id = Number(req.params.id);
  let dc: Dc| null = await Dc.findOneBy({id});
  if(!dc){
    return res.status(422).json({error: "dc not found"});
  }
  res.locals.dc = dc;
  return next();
}

  let routes: Router = Router();
  let controller: DcController = new DcController();

  routes.get('/dcs', controller.list)

  routes.get('/dcs/:id', validateDc, controller.find)

  routes.post('/dcs', validatePayload, controller.create)

  routes.put('/dcs/:id', validateDc, validatePayload, controller.edit);

  routes.delete('/dcs/:id', controller.delete);

export default routes;

