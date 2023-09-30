import {Router, Request, Response, NextFunction} from "express";
import {RecipientsController} from "../controllers/RecipientsController";
import * as yup from 'yup';
import { Recipient } from "../models/Recipient";

async function validatePayload(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
      name: yup.string().min(3).max(255).required(),
      address: yup.string().required(),
      phone: yup.string().min(9).max(14).required(),
      dcId: yup.string().max(3).required(),
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

async function validateRecipient(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
  let id = Number(req.params.id);
  let recipient: Recipient| null = await Recipient.findOneBy({id});
  if(!recipient){
    return res.status(422).json({error: "recipient not found"});
  }
  res.locals.recipient = recipient;

  return next();
}

let routes: Router = Router();
let controller: RecipientsController = new RecipientsController();

  routes.get('/recipients', controller.list)

  routes.get('/recipients/:id', validateRecipient, controller.find)

  routes.post('/recipients', validatePayload, controller.create)

  routes.put('/recipients/:id', validateRecipient, validatePayload, controller.edit);

  routes.delete('/recipients/:id', controller.delete);

export default routes

