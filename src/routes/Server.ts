import  express, {Express, Request, Response} from "express";
import cors from 'cors';
import { text } from "node:stream/consumers";

let server: Express = express();

server.use(cors());
server.use(express.json())

export default {
  start(){
      server.listen(3000, () =>{
      console.log(`user server started on port 3000`)
    });
  }
};
