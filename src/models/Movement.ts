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
  public user_id: number;

  @Column()
  public category_id: number;

  @Column({
    type: 'text',
    unique: true,
    nullable: true,
})
  public recipient_id: number;

  @ManyToOne(() => User, (user) =>user.movements)
  @JoinColumn({name : 'user_id'})
  public user: Promise<User>;

  @ManyToOne(() => Recipient, (recipient) =>recipient.movements)
  @JoinColumn({name : 'recipient_id'})
  public recipient: Promise<Recipient>;

  @ManyToOne(() => Category, (category) =>category.id)
  @JoinColumn({name : 'category_id'})
  public category: Promise<Category>;


}


