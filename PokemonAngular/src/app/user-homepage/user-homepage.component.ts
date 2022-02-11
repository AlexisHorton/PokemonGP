import { Component, OnInit } from '@angular/core';
import { PokemonAPIService } from '../pokemon-api.service';
import { PokemonFull } from '../pokemon-full';
import { Pokemon } from '../pokemonmembers';
import { UserAPIService } from '../user-api.service';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {

  allUsers: UserLogin[] = [];
  pokemonTeam: Pokemon[] = [];
  pokefull: PokemonFull[] = []; 

  currentUser: string = '';
  currentUserID: number = 0;
  current_User: UserLogin | null = null;

  constructor(private userapi: UserAPIService, private pokemonapi: PokemonAPIService) {
    this.currentUser = this.userapi.currentUser;
   }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.pokemonapi.listMembers( this.currentUserID,
        (result: Pokemon[]) => {
          console.log('Results!')
          console.log(result);
          this.pokemonTeam = result;
        }
      )
      this.pokemonapi.GetPokemon(
        (resultb: PokemonFull[]) => {
          console.log('Results!')
          console.log(resultb);
          this.pokefull = resultb;
        }
      )
  }

  refreshUserList(){
    this.userapi.GetUsers(
      (results: any) => {
        this.allUsers = results;
      }
    )
  }

  deleteUser(id: number){
    this.userapi.DeleteUser(
      id, () => {
        this.refreshUserList();
      }
    )
  }

  listTeam(userid:number){
    this.userapi.listTeam(
      userid, (result: any) => {
        this.pokemonTeam = result; 
      }
    )
  }

}
