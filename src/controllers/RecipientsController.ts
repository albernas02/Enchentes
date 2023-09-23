import { Recipient } from '../models/Recipient';
import { Dc } from '../models/Dc';

export class RecipientsController {

  async list (): Promise<Recipient[]> {
    return await Recipient.find();
  }

  async create (name: string, phone: string, situation: string,address: string, dc_id: number): Promise<Recipient> {
    let dc: Dc | null = await Dc.findOneBy({ id: dc_id });
    if (! dc) {
      throw new Error('dc não encontrada!');
    }

    return await Recipient.create({
      name,
      phone,
      situation,
      address,
      dc_id,
    }).save();
  }

  async find (id: number): Promise<Recipient|null> {
    return await Recipient.findOneBy({ id });
  }

  async edit (recipient: Recipient, name: string, phone: string, situation: string, dcId: number): Promise<Recipient> {
    let dc: Dc | null = await Dc.findOneBy({ id: dcId });
    if (! dc) {
      throw new Error('categoria não encontrada!');
    }
    recipient.name = name;
    recipient.phone = phone;
    recipient.situation = situation;
    recipient.dc_id = dcId
    await recipient.save();

    return recipient;
  }

  async delete (recipient: Recipient): Promise<void> {
    recipient.situation = 'I';
    await recipient.save();
  }
}
