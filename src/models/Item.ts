import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Dc } from "./Dc";

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

  @OneToMany(() => Dc, (dcs) => dcs.users_id)
  public dcs: Promise<Dc[]>
}
