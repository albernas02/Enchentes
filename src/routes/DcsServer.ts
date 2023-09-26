import  express, {Express, Request, Response} from "express";
import cors from 'cors';
import { text } from "node:stream/consumers";
import { DcController } from "../controllers/DcsController";
import { Dc } from "../models/Dc";

let server: Express = express();

server.use(cors());
server.use(express.json())


    let controller: DcController;
    controller = new DcController();

    server.get('/dcs', async (req: Request, res: Response): Promise<Response> => {
      let dcs: Dc[] = await Dc.find();
      return res.status(200).json(dcs);
    })

    server.post('/dcs', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let town= payload.town;
      let situation= 'a';

      let dc: Dc = await controller.create(
        town = town,
        situation = payload.situation,
      )
        console.log('cadastro realizado')
      return res.status(200).json(dc);
    })

    server.put('/dcs/:id', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let id = Number(req.params.id);
      let dc: Dc|null = await Dc.findOneBy({id});
      let town = payload.town;
      if(!dc){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.edit(dc,town)
        return res.status(200).json(dc);
    });

    server.delete('/dcs/:id', async(req: Request, res: Response): Promise<Response> =>{
      let id = Number(req.params.id);
      let dc: Dc|null = await Dc.findOneBy({id});
      if(!dc){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.delete(dc);
      return res.status(200).json();
    });

export default {
  start(){
      server.listen(3000, () =>{
      console.log(`Dc server started on port 3000`)
    });
  }
};

