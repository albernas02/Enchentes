import { Category } from "../models/Category";
import { Item } from "../models/Item";

export class ItemsController{
  async find (id: number): Promise<Item|null> {
    return await Item.findOneBy({ id });
  }

  async list (): Promise<Item[]> {
    return await Item.find();
  }

  async create (description: string, amount: number, situation: string, categoryId: number): Promise<Item> {
    let category: Category | null = await Category.findOneBy({ id: categoryId });
    if (! category) {
      throw new Error('categoria não encontrada!');
    }

    return await Item.create({
      description: description,
      amount: amount,
      situation: situation,
      category_id: categoryId,
    }).save();
  }

  async edit (item: Item, description: string, amount: number, categoryId: number): Promise<Item> {
    let category: Category | null = await Category.findOneBy({ id: categoryId });
    if (! category) {
      throw new Error('categoria não encontrada!');
    }

    item.description = description;
    item.amount = amount,
    item.category_id = categoryId,
    await item.save();
    return item;
  }
  async delete (item: Item): Promise<void> {
    item.situation = 'I';
    await item.save();
  }

}
