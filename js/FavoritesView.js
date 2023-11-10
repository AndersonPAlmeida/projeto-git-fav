import { Favorites } from "./Favorites.js";

export class FavoritesView extends Favorites {
   constructor(root){
      super(root);

      this.tbody = this.root.querySelector('table tbody');

      this.updateRow();
      this.clickAdd();
   }

   clickAdd() {
      const addButton = this.root.querySelector('.search button');
      addButton.addEventListener('click', () => {
         const input = this.root.querySelector('.search input');
         const { value } = input;
         
         this.initSearch(value).then((result) => {
            if (result) {            
               input.value = '';
            }
         });
      });
   }

   updateRow() {
      let row;
      this.removeAllTr();

      this.tbody.classList.forEach(classe => {
         this.tbody.classList.remove(classe);
      })
      
      if(this.entries.length === 0) {
         this.tbody.classList.add('emptyList');
         row = this.rowEmpty();
         this.tbody.append(row);
      } else {
         this.tbody.classList.add('listFavorites');
         
         this.entries.forEach(user => {
            row = this.rowNotEmpty();

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
            row.querySelector('.user img').alt = `Imagem de ${user.name}`;
            row.querySelector('.user a').href = `https://github.com/${user.login}`;
            row.querySelector('.user p').textContent = user.name;
            row.querySelector('.user span').textContent = `/${user.login}`;
            row.querySelector('.repositories').textContent = user.public_repos;
            row.querySelector('.followers').textContent = user.followers;

            row.querySelector('.remove').addEventListener('click', () => {
               const isOk = confirm('Tem certeza que deseja deletar essa linha?');

               if (isOk) {
                  this.deleteRow(user);
               }
            });

            this.tbody.append(row);
         });
      }

      
   }

   rowEmpty(){
      const tr = document.createElement('tr');

      tr.innerHTML = `
         <td>
            <img src="./assets/starTable.svg" alt="Estrela">
            <h1>Nenhum favorito ainda</h1>
         </td>
      `;

      return tr;
   }

   rowNotEmpty() {
      const tr = document.createElement('tr');

      tr.innerHTML = `
         <td class="user firstCollumn">
            <img src="https://github.com/maykbrito.png" alt="Imagem de Mayk">
            <a href="https://github.com/maykbrito" target="_blank">
               <p>Mayk Brito</p>
               <span>/maykbrito</span>
            </a>
         </td>
         <td class="repositories otherCollumns">
            123
         </td>
         <td class="followers otherCollumns">
            1234
         </td>
         <td class="otherCollumns">
            <button class="remove">Remover</button>
         </td>
      `;
      return tr;
   }

   removeAllTr() {
      this.tbody.querySelectorAll('tr').forEach(tr => {
         tr.remove()
      })  
   }
}