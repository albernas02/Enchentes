import { DcController } from "../controllers/DcsController";
import { Dc } from "../models/Dc";
import { Item } from "../models/Item";
import PromptSync from "prompt-sync";
const prompt = PromptSync()

export class DcMenu{
  public controller: DcController;

  constructor () {
    this.controller = new DcController();
  }

  public show (): void {
    console.log('[5] - Listar centros de distribuições');
    console.log('[6] - Cadastrar novo centro de distribuição');
    console.log('[7] - Editar centro de distribuição');
    console.log('[8] - Excluir centro de distribuição');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '5':
        await this.list();
        break;
      case '6':
        await this.create();
        break;
      case '7':
        await this.edit();
        break;
      case '8':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let dcs: Dc[] = await this.controller.list();
    console.table(dcs);
  }

  private async create (): Promise<void> {
    let town: string = prompt('Insira a cidade: ');
    let situation: string = 'A';
    let item_id: number = Number(prompt('Insira o id do item'));
    let user_id: number = Number(prompt('Insira o id do usuario'));
    let recipientes_id: number = Number(prompt('Insira o id do beneficiário'));

    let dc: Dc = await this.controller.create(town,situation,item_id, user_id,recipientes_id);
    console.log(`Centro de distribuição ID #${dc.id} criado com sucesso!`);
  }

  private async edit (): Promise<void> {
    this.list();
    let id: number = Number(prompt('Qual o ID? '));
    let dc: Dc | null = await this.controller.find(id);
    if (dc) {
      let town: string = prompt(`Cidade do centro de distribuição: (${dc.town})`, dc.town);
      let item: number = Number(prompt(`Item: (${dc.item})`));
      let user: number = Number(prompt(`Item: (${dc.item})`));
      let recipiente: number = Number(prompt(`Item: (${dc.item})`));
      dc = await this.controller.edit(dc, town, item, user, recipiente);
      console.log(`Centro de distribuição ID #${dc.id} atualizado com sucesso!`);
      dc.save();
    } else {
      console.log('Item não encontrado!');
    }
  }

  private async delete (): Promise<void> {
    this.list();
    let id: number = Number(prompt('Qual o ID? '));
    let dc: Dc | null = await this.controller.find(id);
    if (dc) {
      await this.controller.delete(dc);
      console.log(`Centro de distribuição ID #${id} inativada com sucesso!`);
    } else {
      console.log('Centro de distribuição não encontrada!');
    }
  }

}
