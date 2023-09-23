import { Dc } from "../models/Dc";


export class DcController{
  async list (): Promise<Dc[]> {
    return await Dc.find();
  }

  async create (town: string, situation: string): Promise<Dc> {

    return await Dc.create({
      town : town,
      situation : situation,
    }).save();
  }

  async edit (dc: Dc, town: string): Promise<Dc> {
    dc.town = town;
    await dc.save();
    return dc;
  }

  async find (id: number): Promise<Dc|null> {
    return await Dc.findOneBy({ id });
  }

  async delete (dc: Dc): Promise<void> {
    dc.situation = 'I'
    await dc.save();
  }
}
