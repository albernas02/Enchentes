import  express, {Express, Request, Response} from "express";
import cors from 'cors';
import { text } from "node:stream/consumers";
import { RecipientsController } from "../controllers/RecipientsController";
import { Recipient } from "../models/Recipient";

let server: Express = express();

server.use(cors());
server.use(express.json())


    let controller: RecipientsController;
    controller = new RecipientsController();

    server.get('/recipients', async (req: Request, res: Response): Promise<Response> => {
      let recipients: Recipient[] = await Recipient.find();
      return res.status(200).json(recipients);
    })

    server.post('/recipients', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let adress= payload.adress;
      let name= payload.name;
      let phone= payload.phone;
      let situation = 'a';
      let dcId = payload.dc
      let recipient: Recipient = await controller.create(
        name = payload.name,
        adress = adress,
        phone = phone,
        situation = situation,
        dcId = dcId,
      )
        console.log('cadastro realizado')
      return res.status(200).json(recipient);
    })

    server.put('/recipients/:id', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let id = Number(req.params.id);
      let recipient: Recipient|null = await Recipient.findOneBy({id});
      let name= payload.name;
      let phone= payload.phone;
      let dcId= payload.dc;
      let situation = 'a';
      if(!recipient){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.edit(recipient,name, phone, situation,dcId)
        return res.status(200).json(recipient);
    });

    server.delete('/recipients/:id', async(req: Request, res: Response): Promise<Response> =>{
      let id = Number(req.params.id);
      let recipient: Recipient|null = await Recipient.findOneBy({id});
      if(!recipient){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.delete(recipient);
      return res.status(200).json();
    });

export default {
  start(){
      server.listen(3000, () =>{
      console.log(`recipient server started on port 3000`)
    });
  }
};

