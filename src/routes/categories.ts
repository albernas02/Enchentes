import { NextFunction, Router, Response, Request } from "express";
import { CategoriesController } from "../controllers/CategoriesController";
import * as yup from 'yup';
import { Category } from "../models/Category";


async function validatePayload(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    desciption: yup.string().min(3).max(255).required(),
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

async function validateCategory(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
  let id = Number(req.params.id);
  let category: Category| null = await Category.findOneBy({id});
  if(!category){
      return res.status(422).json({error: "category not found"});
  }
  res.locals.category = category;

  return next();
}

let routes: Router = Router();

  let controller: CategoriesController = new CategoriesController();

  routes.get('/categories', controller.list)

  routes.get('/categories/:id', validateCategory, controller.find)

  routes.post('/categories', validatePayload, controller.create)

  routes.put('/categories/:id', validateCategory, validatePayload, controller.edit);

  routes.delete('/categories/:id', validateCategory, controller.delete);

export default routes

