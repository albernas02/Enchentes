import { Dc } from "../models/Dc";
import { Item } from "../models/Item";
import { Recipient } from "../models/Recipient";
import { User } from "../models/User";


export class DcController{
  async list (): Promise<Dc[]> {
    return await Dc.find();
  }

  async create (town: string, situation: string, item_id: number, users_id: number, recipientes_id: number, ): Promise<Dc> {
    let item: Item | null = await Item.findOneBy({ id: item_id });
    
    if (! item){
      throw new Error('Item não encontrado')
    }
    let user: User | null = await User.findOneBy({ id: users_id });
    if (! item){
      throw new Error('Usuário não encontrado')
    }

    let recipiente: Recipient | null = await Recipient.findOneBy({ id: recipientes_id });
    if (! recipiente){
      throw new Error('Beneficiário não encontrado')
    }

    return await Dc.create({
      town : town,
      situation: 'A',
      item : item,
      user : user,
      recipiente : recipiente,
    }).save();
  }

  async edit (dc: Dc, town: string, items: number, users: number, recipientes: number): Promise<Dc> {
    dc.town = town;
    dc.items = items;
    dc.user = users;
    dc.recipiente = recipientes;
    await dc.save();
    return dc;
  }

  async delete (dc: Dc): Promise<void> {
    dc.situation = 'I'
    await dc.save();
  }
}
