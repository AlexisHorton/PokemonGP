import { Component, OnInit } from '@angular/core';
import { PokemonAPIService } from '../pokemon-api.service';
import { PokemonFull } from '../pokemon-full';
import { UserAPIService } from '../user-api.service';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  allUsers: UserLogin[] = [];
  allPokemon: PokemonFull[] = [];

  constructor(private userapi: UserAPIService, private pokemonapi: PokemonAPIService) { }

  ngOnInit(): void {
    this.refreshUserList();
    this.listPokemon();
  }

  refreshUserList(){
    this.userapi.GetUsers(
      (results: any) => {
        this.allUsers = results;
      }
    );
  }  

  listPokemon(){
    this.pokemonapi.GetPokemon(
      (results: PokemonFull[]) => {
        this.allPokemon = results;
      }
    )
  }

}
