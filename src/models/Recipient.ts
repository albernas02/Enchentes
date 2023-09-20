import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movement } from "./Movement";
import { Dc } from "./Dc";
import { Item } from "./Item";

@Entity('recipients')
export class Recipient extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public address: string;

  @Column()
  public phone: string;

  @Column()
  public situation: string;

  @Column({ type: 'timestamp', default: 'NOW()' })
  public booked_at: string;

  @Column()
  public items_name: string;

  @Column()
  public dc_name: string;

  @Column()
  public movements_name: string;

  @OneToMany(() => Movement , (movements) => movements.recipient)
  public movements: Movement

  @OneToMany(() => Dc , (dcs) => dcs.recipient)
  public dcs: Dc

}
