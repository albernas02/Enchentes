import  express, {Request, Response} from "express";
import cors from 'cors';
import { Category} from '../models/Category';

export class CategoriesController {

  async list (req: Request, res: Response): Promise<Response>{
    let categories: Category[] = await Category.find();
    return res.status(200).json(categories);
  }

  async find (req: Request, res: Response): Promise<Response>{
    let category: Category = res.locals.category;

    return res.status(200).json(category);
  }

  async create (req: Request, res: Response): Promise<Response>{
    let payload = req.body;

    let category: Category = await Category.create({
      description: payload.description,
      situation: 'a',
    }).save()
    return res.status(200).json(category);
  }

  async edit (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
      let category : Category = res.locals.category;

      category.description = payload.description;
      await category.save();
      return res.status(200).json(category);
    }

  async delete (req: Request, res: Response): Promise<Response>{
    let category: Category = res.locals.category;

        category.situation = 'i';
        await category.save();

        return res.status(200).json();
  }
}
