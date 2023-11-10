import { GithubUser } from "./GithubUser.js";

export class Favorites {
   constructor(root) {
      this.root = root;
      this.load();
   }

   load() {
      this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
   }

   save() {
      localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
   }

   async initSearch(username) {
      try {
         const userExists = this.entries.find(entry => entry.login === username);
         
         if(userExists) {
            throw new Error('Usuário já cadastrado');
         }

         const user = await GithubUser.search(username);
    
         if(user.login === undefined || user.name === null) {
            throw new Error('Usuário não encontrado!');
         }

         this.entries = [...this.entries, user];

         this.updateRow();
         this.save();

         return true;
      } catch (error) {
         alert(error.message);
         return false;
      }
   }

   deleteRow(user) {
      const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)
  
      this.entries = filteredEntries
      this.updateRow()
      this.save()
    }
}