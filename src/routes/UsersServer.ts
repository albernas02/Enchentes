import  express, {Express, Request, Response} from "express";
import cors from 'cors';
import { text } from "node:stream/consumers";
import { User } from "../models/User";
import { UsersController } from "../controllers/UsersController";

let server: Express = express();

server.use(cors());
server.use(express.json())


    let controller: UsersController;
    controller = new UsersController();

    server.get('/users', async (req: Request, res: Response): Promise<Response> => {
      let users: User[] = await User.find();
      return res.status(200).json(users);
    })

    server.post('/users', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let password= payload.password;
      let name= payload.name;
      let email= payload.email;
      let situation = 'a';
      let user: User = await controller.create(
        name = payload.name,
        password = password,
        email = email,
        situation = situation,
      )
        console.log('cadastro realizado')
      return res.status(200).json(user);
    })

    server.put('/users/:id', async(req: Request, res: Response): Promise<Response> =>{
      let payload = req.body;
      let id = Number(req.params.id);
      let user: User|null = await User.findOneBy({id});
      let password= payload.password;
      let name= payload.name;
      let email= payload.email;
      let situation = 'a';
      if(!user){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.edit(user,name,password,email,situation)
        return res.status(200).json(user);
    });

    server.delete('/users/:id', async(req: Request, res: Response): Promise<Response> =>{
      let id = Number(req.params.id);
      let user: User|null = await User.findOneBy({id});
      if(!user){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      controller.delete(user);
      return res.status(200).json();
    });

export default {
  start(){
      server.listen(3000, () =>{
      console.log(`user server started on port 3000`)
    });
  }
};

