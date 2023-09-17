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
  public items_id: number;

  @Column()
  public dc_id: number;

  @Column()
  public movements_id:number;

  @OneToMany(() => Movement , (movements) => movements.recipient_id)
  public movements: Promise<Movement>

  @OneToMany(() => Dc , (dcs) => dcs.recipients_id)
  public dcs: Promise<Dc>

  @ManyToOne(() => Item, (item) => item.dcs)
  @JoinColumn({ name: 'item_id' })
  public item: Item;

}
