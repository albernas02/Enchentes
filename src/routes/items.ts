import  express, {Router, Response, Request, NextFunction} from "express";
import { ItemsController } from "../controllers/ItemsController";
import * as yup from 'yup';
import { Item } from "../models/Item";

async function validatePayload(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    description: yup.string().min(3).max(255).required(),
    amount: yup.string().required(),
    category_id: yup.string().max(16).required(),
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

async function validateItem(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
  let id = Number(req.params.id);
  let item: Item| null = await Item.findOneBy({id});
  if(!item){
    return res.status(422).json({error: "item not found"});
  }
  res.locals.item = item;

  return next();
}

let routes: Router = Router()

  let controller: ItemsController = new ItemsController();

  routes.get('/items', controller.list)

  routes.get('/items/:id', validateItem, controller.find)

  routes.post('/items', validatePayload, controller.create)

  routes.put('/items/:id', validateItem, validatePayload, controller.edit);

  routes.delete('/items/:id', controller.delete);

export default routes;

