import  express, {Express, Request, Response} from "express";
import cors from 'cors';
import { text } from "node:stream/consumers";
import { MovementsController } from "../controllers/MovementsController";
import { Movement } from "../models/Movement";
import { pathToFileURL } from "node:url";

let server: Express = express();

server.use(cors());
server.use(express.json())


    let controller: MovementsController;
    controller = new MovementsController();

    server.get('/movements', async (req: Request, res: Response): Promise<Response> => {
      let movements: Movement[] = await Movement.find();
      return res.status(200).json(movements);
    })

    server.post('/movements', async(req: Request, res: Response): Promise<Response> =>{
      let movement;
      let payload = req.body;
      let town= payload.town;
      let situation= 'a';
      let userId = payload.user.id;
      let type = payload.type;
      let amount = payload.amount;
      let itemId = payload.itemid;
      let recipientId;
      recipientId = null;
      if(type == 'saida'){
        let recipientId: number = Number(prompt('ID do beneficiário: '));
      }else if(type == 'entrada'){
        recipientId = null;
      }else{
        console.log('operaçao inválida')
      }
      try {
        let aux: Movement = await controller.create(userId, type, town, amount, itemId, recipientId);
        movement = aux;
        console.log(`Tarefa ID #${movement.id} criada com sucesso!`);
      } catch (error: any) {
        console.log(error.message);
      }
      console.log('cadastro realizado');
      return res.status(200).json(movement);
    })

    server.put('/movements/:id', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let id: number = Number(prompt('Qual o ID? '));
    let movement: Movement | null = await controller.find(id);
    if (movement) {
      let userId = movement.user_id;
      let type = payload.type;
      let town = payload.town;
      let categoryId = payload.categoryId;
      let amount = payload.amount;
      let recipientId = payload.recipientId;
      movement.save();
      try {
        movement = await controller.edit(movement, userId, type, town, amount, categoryId,recipientId);
        console.log(`Movimentação ID #${movement.id} atualizada com sucesso!`);
      } catch (error: any) {
        console.log(error.message);
      }

    } else {
      console.log('Tarefa não encontrada!');
    }
        return res.status(200).json(movement);
    });

    server.delete('/movements/:id', async(req: Request, res: Response): Promise<Response> =>{
      let id = Number(req.params.id);
      let movement: Movement|null = await Movement.findOneBy({id});
      if(!movement){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.delete(movement);
      return res.status(200).json();
    });

export default {
  start(){
      server.listen(3000, () =>{
      console.log(`Movement server started on port 3000`)
    });
  }
};

