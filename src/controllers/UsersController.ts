import  express, {Request, Response} from "express";
import cors from 'cors';
import { User } from '../models/User';
import { Criptography } from '../controllers/Cript';
const crypto: Criptography = new Criptography();

export class UsersController {

  async list (req: Request, res: Response): Promise<Response> {
    let users: User[] = await User.find();
    return res.status(200).json(users);
  }

  async find (req: Request, res: Response): Promise<Response>{
    let user: User = res.locals.user;
    return res.status(200).json(user);
  }

  async create (req: Request, res: Response): Promise<Response>{
    let payload = req.body;

    let user: User = await User.create({
      name : payload.name,
      email : payload.email,
      password : crypto.cript(payload.password),
      situation : 'a',
    }).save()
    return res.status(200).json(user);
  }

  async edit(req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let user : User = res.locals.user;

    user.name = payload.name;
    user.email = payload.email;
    user.password = crypto.cript(payload.password);
    await user.save();

    return res.status(200).json(user);
  }

  async delete (req: Request, res: Response): Promise<Response>{
    let user: User = res.locals.user;
    user.situation = 'i';
    await user.save();

    return res.status(200).json();
  }
}
