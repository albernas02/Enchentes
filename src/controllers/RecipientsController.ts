import  express, {Request, Response} from "express";
import cors from 'cors';
import { Recipient } from '../models/Recipient';

export class RecipientsController {

  async list (req: Request, res: Response): Promise<Response>{
    let recipients: Recipient[] = await Recipient.find();
    return res.status(200).json(recipients);
  }

  async find (req: Request, res: Response): Promise<Response>{
    let recipient: Recipient = res.locals.recipient;
    return res.status(200).json(recipient);
  }

  async create (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let recipient: Recipient = await Recipient.create({
      name : payload.name,
      address : payload.address,
      phone : payload.phone,
      situation : 'a',
      dc_id : payload.dcId,
  }).save();
    return res.status(200).json(recipient);
  }

  async edit (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let recipient: Recipient = res.locals.recipient;
    recipient.name= payload.name;
    recipient.phone= payload.phone;
    recipient.dc_id= payload.dc;
    recipient.situation = 'a';
    await recipient.save();

    return res.status(200).json(recipient);
  }
  async delete (req: Request, res: Response): Promise<Response>{
    let recipient: Recipient = res.locals.recipient;
    recipient.situation = 'i';
    await recipient.save();

    return res.status(200).json();
  }
}
