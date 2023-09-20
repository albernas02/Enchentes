import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Movement} from "./Movement";
import { Item } from "./Item";

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public description: string;

  @Column()
  public situation: string;

  @OneToMany(() => Item, (items) => items.category_id)
  public item: Promise<Item[]>;

  @OneToMany(() => Movement, (movements) => movements.category_id)
  public movements: Promise<Movement[]>;
}
