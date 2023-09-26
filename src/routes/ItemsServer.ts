import  express, {Express, Request, Response} from "express";
import cors from 'cors';
import { text } from "node:stream/consumers";
import { ItemsController } from "../controllers/ItemsController";
import { Item } from "../models/Item";

let server: Express = express();

server.use(cors());
server.use(express.json())


    let controller: ItemsController;
    controller = new ItemsController();

    server.get('/items', async (req: Request, res: Response): Promise<Response> => {
      let items: Item[] = await Item.find();
      return res.status(200).json(items);
    })

    server.post('/items', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let description= payload.description;
      let amount= payload.amount;
      let categoryId= payload.categoryId;
      let situation = 'a';
      let item: Item = await controller.create(
        amount = payload.amount,
        description = description,
        situation = situation,
        categoryId = categoryId,
      )
        console.log('cadastro realizado')
      return res.status(200).json(item);
    })

    server.put('/items/:id', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let id = Number(req.params.id);
      let item: Item|null = await Item.findOneBy({id});
      let description= payload.description;
      let amount= payload.amount;
      let categoryId= payload.categoryId;
      let situation = 'a';
      if(!item){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.edit(item,description,amount, categoryId)
        return res.status(200).json(item);
    });

    server.delete('/items/:id', async(req: Request, res: Response): Promise<Response> =>{
      let id = Number(req.params.id);
      let item: Item|null = await Item.findOneBy({id});
      if(!item){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.delete(item);
      return res.status(200).json();
    });

export default {
  start(){
      server.listen(3000, () =>{
      console.log(`Item server started on port 3000`)
    });
  }
};

