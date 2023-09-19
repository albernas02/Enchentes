import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Item } from "./Item";
import { User } from "./User";
import { Recipient } from "./Recipient";

Entity('dcs')
export class Dc extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public town: string;

  @Column()
  public situation: string;

  @Column()
  public items_name: string;

  @Column()
  public users_name: string;

  @Column()
  public recipients_name: string;


  @ManyToOne(() => Recipient, (recipient) => recipient.dcs)
  @JoinColumn({ name: 'recipients_name' })
  public recipient:Recipient;

  @ManyToOne(() => User, (user) => user.dcs)
  @JoinColumn({name: 'user_name'})
  public user: User

  @ManyToOne(() => Item, (item) => item.dc)
  @JoinColumn({ name: 'item_name' })
  public item: Item;

}
