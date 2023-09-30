import {Request, Response} from "express";
import cors from 'cors';
import { Movement } from '../models/Movement';
import { Recipient } from '../models/Recipient';
import { Item } from '../models/Item';

export class MovementsController {

  async list (req: Request, res: Response): Promise<Response>{
    let movements: Movement[] = await Movement.find();
    return res.status(200).json(movements);
  }

  async find (req: Request, res: Response): Promise<Response>{
    let movement: Movement =res.locals.movement
    return res.status(200).json(movement);
  }

  async create (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let item: Item|null = await Item.findOneBy({id : payload.itemId});
    if(!item){
      return res.status(422).json({error: "Item not found"});
    }

    if(payload.type =='saida'){
      let recipient: Recipient|null = await Recipient.findOneBy({id : payload.recipientId});
      if(!recipient){
        return res.status(422).json({error: "Recipient not found"});
      }
    }else{
      payload.recipientId = null;
    }
    let movement: Movement = await Movement.create({
      user_id: payload.userId,
      type : payload.type,
      town: payload.town,
      amount: payload.amount,
      item_id: payload.itemId,
      recipient_id: payload.recipientId
      }).save();
    return res.status(200).json(movement);
  }

  async edit (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let movement: Movement =res.locals.movement
    movement.user_id = movement.user_id;
    movement.type = payload.type;
    movement.town = payload.town;
    movement.amount = payload.amount;
    movement.recipient_id = payload.recipientId;
    await movement.save();
  return res.status(200).json(movement);
  }

  async delete(req: Request, res: Response): Promise<Response>{
    let movement: Movement = res.locals.movement;
    movement.remove();
    return res.status(200).json();
  }
}
