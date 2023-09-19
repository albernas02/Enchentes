import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import { Recipient } from "./Recipient";

@Entity('movements')
export class Movement extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'timestamp', default: 'NOW()' })
  public create_at: Date;

  @Column()
  public type: string;

  @Column()
  public town: string;

  @Column()
  public amount: number;

  @Column()
  public user_name: string;

  @Column()
  public category_name: string;

  @Column()
  public recipient_name: string;

  @ManyToOne(() => User, (user) =>user.movements)
  @JoinColumn({name : 'user_name'})
  public user: User;

  @ManyToOne(() => Recipient, (recipient) =>recipient.movements)
  @JoinColumn({name : 'recipient_name'})
  public recipient: Recipient;

  @ManyToOne(() => Category, (category) =>category.id)
  @JoinColumn({name : 'category_name'})
  public category: Category;
}
