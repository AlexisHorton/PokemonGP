import { Component, OnInit } from '@angular/core';
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

  currentUser: string = '';
  currentUserID: number = 0;
  current_User: UserLogin | null = null;

  constructor(private userapi: UserAPIService) { }

  ngOnInit(): void {
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
