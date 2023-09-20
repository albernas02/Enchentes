import {MovementsController } from '../controllers/MovementsController';
import { User } from '../models/User';
import promptSync from 'prompt-sync';
import { Movement} from '../models/Movement';
import { Between, Timestamp } from 'typeorm';

const prompt = promptSync();

export class MovementsMenu {

  public controller: MovementsController;

  constructor () {
    this.controller = new MovementsController();
  }

  public show (): void {
    console.log('[9] - Listar movimentações');
    console.log('[10] - Cadastrar novo movimentação');
    console.log('[11] - Editar movimentação');
    console.log('[12] - Excluir movimentação');
  }

  public async execute (input: string, user: User| null): Promise<void> {
    switch (input) {
      case '9':
        await this.list(user);
        break;
      case '10':
      if(user){
        await this.create(user);
      }else{
        console.log('Você precisa estar logado')
      }
        break;
      case '11':
        if(user){
          await this.edit(user);
        }else{
          console.log('Você precisa estar logado')
        }
      break;
      case '12':
        await this.delete();
      break;
    }
  }

  private async list (user: User | null): Promise<void> {
    let control: string = '';
    let tasks: Movement[] = await this.controller.list();
  }

  private async create (user: User): Promise<void> {
    let userId: number = user.id;
    let type: string = prompt('Ação realizada(entrada ou saída): ');
    let town: string = prompt('Cidade: ');
    let amount: number =Number (prompt('Quantidade: '));
    let categoryId: number = Number(prompt('ID da categoria: '));
    let recipientId: number = Number(prompt('ID da categoria: '));
    try {
      let task: Movement = await this.controller.create(userId, type, town, amount, categoryId, recipientId);
      console.log(`Tarefa ID #${task.id} criada com sucesso!`);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  private async edit (user: User): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let movement: Movement | null = await this.controller.find(id);
    if (movement) {
      let userId: number = user.id;
      let type: string = prompt('Ação realizada(entrada ou saída): ');
      let town: string = prompt('Cidade: ');
      let categoryId: number = Number(prompt('ID da categoria: '));
      let amount: number = Number(prompt('Quantidade: '));
      let recipientId: number = Number(prompt('Quantidade: '));
      movement.save();
      try {
        movement = await this.controller.edit(movement, userId, type, town, amount, categoryId,recipientId);
        console.log(`Movimentação ID #${movement.id} atualizada com sucesso!`);
      } catch (error: any) {
        console.log(error.message);
      }

    } else {
      console.log('Tarefa não encontrada!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let movement: Movement | null = await this.controller.find(id);
    if (movement) {
      await this.controller.delete(movement);
      console.log(`Tarefa ID #${id} excluída com sucesso!`);
    } else {
      console.log('Tarefa não encontrada!');
    }
  }
}
