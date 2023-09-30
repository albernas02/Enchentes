import  express, {Request, Response} from "express";
import cors from 'cors';
import { Category } from "../models/Category";
import { Item } from "../models/Item";

export class ItemsController{

  async list (req: Request, res: Response): Promise<Response>{
    let items: Item[] = await Item.find();
    return res.status(200).json(items);
  }

  async find (req: Request, res: Response): Promise<Response>{
    let item: Item = res.locals.item;

    return res.status(200).json(item);
  }

  async create(req: Request, res: Response): Promise<Response>{
    let payload = req.body;

    let item: Item = await Item.create({
      description : payload.description,
      amount : payload.amount,
      category_id : payload.category_id,
      situation : 'a',
    }).save()
    return res.status(200).json(item);
  }

  async edit (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let item : Item = res.locals.item;

    item.description = payload.description;
    item.amount = payload.amount;
    await item.save();
    return res.status(200).json(item);
    }

  async delete (req: Request, res: Response): Promise<Response>{
    let item: Item = res.locals.item;
      item.situation = 'i';
      await item.save();

      return res.status(200).json();
  }
}
