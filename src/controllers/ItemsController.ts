import { Category } from "../models/Category";
import { Dc } from "../models/Dc";
import { Item } from "../models/Item";

export class ItemsController{
  find(id: number): Item | PromiseLike<Item | null> | null {
    throw new Error("Method not implemented.");
  }

  async list (): Promise<Item[]> {
    return await Item.find();
  }

  async create (description: string, amount: number, situation: string, categoryId: number, dcId: number): Promise<Item> {
    let category: Category | null = await Category.findOneBy({ id: categoryId });
    if (! category) {
      throw new Error('categoria não encontrada!');
    }
    let dc: Dc | null = await Dc.findOneBy({ id: dcId });
    if (! dc) {
      throw new Error('dc não encontrada!');
    }

    return await Item.create({
      description: description,
      amount: amount,
      situation: situation,
      category: category,
      dc: dc,
    }).save();
  }

  async edit (item: Item, description: string, amount: number, categoryId: number, dcId: number): Promise<Item> {
    let category: Category | null = await Category.findOneBy({ id: categoryId });
    if (! category) {
      throw new Error('categoria não encontrada!');
    }
    let dc: Dc | null = await Dc.findOneBy({ id: dcId });
    if (! dc) {
      throw new Error('dc não encontrada!');
    }

    item.description = description;
    item.amount = amount,
    item.category = category,
    item.dc = dc,
    await item.save();
    return item;
  }
  async delete (item: Item): Promise<void> {
    await item.save();
  }

}
