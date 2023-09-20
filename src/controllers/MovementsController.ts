import { Between, Not } from 'typeorm';
import { Category } from '../models/Category';
import { Movement } from '../models/Movement';
import { User } from '../models/User';
import { Recipient } from '../models/Recipient';

export class MovementsController {
  async list (): Promise<Movement[]> {
    return await Movement.find();
  }

  async create (userId: number, type: string,town: string, amount: number, categoryId: number, recipient_id: number): Promise<Movement> {
    let user: User | null = await User.findOneBy({ id: userId });
    if (! user) {
      throw new Error('Usuário não encontrado!');
    }

    let category: Category | null = await Category.findOneBy({ id: categoryId });
    if (! category) {
      throw new Error('Categoria não encontrado!');
    }
    if(type == 'Doação'){
      let recipient: Recipient | null = await Recipient.findOneBy({ id: recipient_id });
      if (! recipient) {
        throw new Error('Beneficiário não encontrado!');
      }
      return await Movement.create({
        type: type,
        town: town,
        amount: amount,
        user_id: userId,
        category_id: categoryId,
        recipient_id: recipient_id
      }).save();
    }else if(type == 'Recebimento'){
      return await Movement.create({
        type: type,
        town: town,
        amount: amount,
        user_id: userId,
        category_id: categoryId,
      }).save();
    }else{
      throw new Error('Tipo inválido')
    }
  }

  async find (id: number): Promise<Movement|null> {
    return await Movement.findOneBy({ id });
  }

  async edit (movements: Movement,userId: number, type: string,town: string, amount: number, categoryId: number, recipient_id: number): Promise<Movement> {
    let movement: Movement | null = await Movement.findOneBy({ id: movements.id });
    if (! movement) {
      throw new Error('Tarefa não encontrada!');
    }

    let category: Category | null = await Category.findOneBy({ id: categoryId });
    if (! category) {
      throw new Error('Tarefa não encontrada!');
    }
    let user: User | null = await User.findOneBy({ id: userId });
    if (! user) {
      throw new Error('Usuário não encontrado!');
    }

    if(type == 'Doação'){
      movement.user_id = userId;
      movement.type = type;
      movement.town = town;
      movement.category_id = categoryId;
      movement.recipient_id = recipient_id;
      movement.save();

    return movement;
    }else if(type == 'Recebimento'){
      movement.user_id = userId;
      movement.type = type;
      movement.town = town;
      movement.category_id = categoryId;
      movement.save();

    return movement;
    }else{
      throw new Error('Tipo enválido');
    }

  }

  async delete (movement: Movement): Promise<void> {
    await movement.remove();
  }
}
