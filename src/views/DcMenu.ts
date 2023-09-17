import { DcController } from "../controllers/DcController";
import { Dc } from "../models/Dc";
import { Item } from "../models/Item";


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
    let item: number = Number(prompt('Insira o id do item'));
    let user: number = Number(prompt('Insira o id do usuario'));
    let recipientes: number = Number(prompt('Insira o id do beneficiário'));

    let dc: Dc = await this.controller.create(town,item,user,recipientes, situation);
    console.log(`Categoria ID #${category.id} criado com sucesso!`);
  }
}
