import { Category } from '../models/Category';
import { Movement } from '../models/Movement';
import { User } from '../models/User';
import { Recipient } from '../models/Recipient';
import { Item } from '../models/Item';

export class MovementsController {
  async list (): Promise<Movement[]> {
    return await Movement.find();
  }

  async create (userId: number, type: string,town: string, amount: number, itemId: number, recipient_id: number|null): Promise<Movement> {
    let user: User | null = await User.findOneBy({ id: userId });
    if (! user) {
      throw new Error('Usuário não encontrado!');
    }

    let item: Item | null = await Item.findOneBy({ id: itemId });
    if (! item) {
      throw new Error('item não encontrado!');
    }

    if(recipient_id){
      let recipient: Recipient | null = await Recipient.findOneBy({ id: recipient_id });
      if (! recipient) {
        throw new Error('Beneficiário não encontrado!');
      }
      return await Movement.create({
        type: type,
        town: town,
        amount: amount,
        user_id: userId,
        item_id: itemId,
        recipient_id: recipient_id
      }).save();
    }else if(recipient_id == null){
      return await Movement.create({
        type: type,
        town: town,
        amount: amount,
        user_id: userId,
        item_id: itemId,
      }).save();
    }else{
      throw new Error('Tipo inválido')
    }
  }

  async find (id: number): Promise<Movement|null> {
    return await Movement.findOneBy({ id });
  }

  async edit (movements: Movement,userId: number, type: string,town: string, amount: number, itemId: number, recipient_id: number): Promise<Movement> {
    let movement: Movement | null = await Movement.findOneBy({ id: movements.id });
    if (! movement) {
      throw new Error('Tarefa não encontrada!');
    }

    let category: Category | null = await Category.findOneBy({ id: itemId });
    if (! category) {
      throw new Error('Tarefa não encontrada!');
    }
    let user: User | null = await User.findOneBy({ id: userId });
    if (! user) {
      throw new Error('Usuário não encontrado!');
    }

    if(type == 'saida'){
      movement.user_id = userId;
      movement.type = type;
      movement.town = town;
      movement.item_id = itemId;
      movement.recipient_id = recipient_id;
      movement.save();

    return movement;
    }else if(type == 'entrada'){
      movement.user_id = userId;
      movement.type = type;
      movement.town = town;
      movement.item_id = itemId;
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
