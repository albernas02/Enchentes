import { Category} from '../models/Category';
import { Item } from '../models/Item';
import { Movement } from '../models/Movement';

export class CategoriesController {
  async list (): Promise<Category[]> {
    return await Category.find();
  }

  async create (description: string, situation: string, itemId: number, movementId: number): Promise<Category> {

    let item: Item | null = await Item.findOneBy({ id: itemId });
    if (! item) {
      throw new Error('categoria não encontrada!');
    }

    let movement: Movement | null = await Movement.findOneBy({ id: movementId });
    if (! movement) {
      throw new Error('categoria não encontrada!');
    }

    return await Category.create({
      description: description,
      situation: situation,
      item: item,
      movements: movement,
    }).save();
  }

  async find (id: number): Promise<Category|null> {
    return await Category.findOneBy({ id });
  }

  async edit (category: Category,description: string, itemId: number, movementId: number): Promise<Category> {
    let item: Item | null = await Item.findOneBy({ id: itemId });
    if (! item) {
      throw new Error('categoria não encontrada!');
    }

    let movement: Movement | null = await Movement.findOneBy({ id: movementId });
    if (! movement) {
      throw new Error('categoria não encontrada!');
    }

    category.description = description;
    category.item = item,
    category.movements = movement
    await category.save();
    return category;
  }

  async delete (category: Category): Promise<void> {
    await category.save();
  }
}
