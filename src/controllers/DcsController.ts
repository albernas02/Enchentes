import  express, {Request, Response} from "express";
import cors from 'cors';
import { Dc } from "../models/Dc";

export class DcController{

  async list (req: Request, res: Response): Promise<Response>{
    let dcs: Dc[] = await Dc.find();
    return res.status(200).json(dcs);
  }

  async find (req: Request, res: Response): Promise<Response>{
    let dc: Dc = res.locals.dc;

    return res.status(200).json(dc);
  }

  async create (req: Request, res: Response): Promise<Response>{
    let payload = req.body;

    let dc: Dc = await Dc.create({
      town : payload.town,
      situation : 'a',
    }).save()
    return res.status(200).json(dc);
  }

  async edit (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
      let dc : Dc = res.locals.dc;

      dc.town = payload.town;
      dc.situation = 'a';
      await dc.save();

      return res.status(200).json(dc);
  }

  async delete (req: Request, res: Response): Promise<Response>{
    let dc: Dc = res.locals.dc;

        dc.situation = 'i';
        await dc.save();

        return res.status(200).json();
  }
}
