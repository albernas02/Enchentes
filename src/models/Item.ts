import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Dc } from "./Dc";
import { Category } from "./Category";

Entity('items')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public  description: string;

  @Column()
  public amount: number;

  @Column()
  public situation: string;

  @ManyToOne(() => Category, (categories) => categories.item)
  public category: Category;

  @OneToMany(() => Dc, (dc) => dc.item)
  public dc: Dc;
}
