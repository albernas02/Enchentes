import { Category} from '../models/Category';
import { Item } from '../models/Item';
import { Movement } from '../models/Movement';

export class CategoriesController {
  async list (): Promise<Category[]> {
    return await Category.find();
  }

  async create (description: string, situation: string, items_id: number, movements_id: number): Promise<Category> {

    let item: Item | null = await Item.findOneBy({ id: items_id });
    if (! item) {
      throw new Error('categoria não encontrada!');
    }

    let movement: Movement | null = await Movement.findOneBy({ id: movements_id });
    if (! movement) {
      throw new Error('categoria não encontrada!');
    }

    return await Category.create({
      description: description,
      situation: situation,
    }).save();
  }

  async find (id: number): Promise<Category|null> {
    return await Category.findOneBy({ id });
  }

  async edit (category: Category,description: string, itemId: number, movementId: number): Promise<Category> {
    category.description = description;
    await category.save();
    return category;
  }

  async delete (category: Category): Promise<void> {
    category.situation = 'I';
    await category.save();
  }
}
