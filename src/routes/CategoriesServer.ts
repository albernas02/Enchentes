import  express, {Express, Request, Response} from "express";
import cors from 'cors';
import { text } from "node:stream/consumers";
import { CategoriesController } from "../controllers/CategoriesController";
import { Category } from "../models/Category";

let server: Express = express();

server.use(cors());
server.use(express.json())


    let controller: CategoriesController;
    controller = new CategoriesController();

    server.get('/categories', async (req: Request, res: Response): Promise<Response> => {
      let categories: Category[] = await Category.find();
      return res.status(200).json(categories);
    })

    server.post('/categories', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let description= payload.description;
      let situation= 'a';

      let category: Category = await controller.create(
        description = description,
        situation = payload.situation,
      )
        console.log('cadastro realizado')
      return res.status(200).json(category);
    })

    server.put('/categories/:id', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let id = Number(req.params.id);
      let category: Category|null = await Category.findOneBy({id});
      let description = payload.description;
      if(!category){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.edit(category,description)
        return res.status(200).json(category);
    });

    server.delete('/categories/:id', async(req: Request, res: Response): Promise<Response> =>{
      let id = Number(req.params.id);
      let category: Category|null = await Category.findOneBy({id});
      if(!category){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.delete(category);
      return res.status(200).json();
    });

export default {
  start(){
      server.listen(3000, () =>{
      console.log(`category server started on port 3000`)
    });
  }
};

