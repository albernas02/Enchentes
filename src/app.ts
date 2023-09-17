import DB from './db';
import { UsersMenu } from './views/UsersMenu';
import { CategoriesMenu } from './views/CategoriesMenu';
import { MovementsMenu } from './views/MovementsMenu';
import { ItemsMenu } from './views/ItemsMenu';
import { RecepientsMenu } from './views/RecepientsMenu';
import promptSync from 'prompt-sync';

const prompt = promptSync();

async function main(): Promise<void> {
  await DB.initialize();


  // Inicializa os menus
  let usersMenu: UsersMenu = new UsersMenu();
  let categoriesMenu: CategoriesMenu = new CategoriesMenu();
  let movementsMenu: MovementsMenu = new MovementsMenu();
  let recipientsMenu: RecepientsMenu = new RecepientsMenu();
  let itemsMenus: ItemsMenu = new ItemsMenu();

  let input: string = '';

  do{
    let user = usersMenu.loginMenu()
    if(await user){

      do {
        console.clear();

        usersMenu.show();0
        categoriesMenu.show();
        movementsMenu.show();
        recipientsMenu.show();
        itemsMenus.show();
        console.log('0 - Sair');

        input = prompt('Selecione a opção desejada: ');

        if (input != '0') {

          await usersMenu.execute(input);
          await categoriesMenu.execute(input);
          await movementsMenu.execute(input, await user);
          await recipientsMenu.execute(input);
          await itemsMenus.execute(input);

          prompt('Pressione enter para continuar');
        }
      } while (input != '0');
    }else{
      console.log('Usuário ou senha incorretos');
      input = prompt('Aperte [ENTER] para continuar ou [0] sair: ');
    }
  }while (input != '0');
}
main();
