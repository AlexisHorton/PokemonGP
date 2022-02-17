import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../pokemonmembers';
import { PokemonFull } from '../pokemon-full';
import { PokemonAPIService } from '../pokemon-api.service';
import { UserAPIService } from '../user-api.service';
import { UserPokedexComponent } from '../user-pokedex/user-pokedex.component';



@Component({
  selector: 'app-starter-pokemon',
  templateUrl: './starter-pokemon.component.html',
  styleUrls: ['./starter-pokemon.component.css']
})
export class StarterPokemonComponent implements OnInit {

  pokemons: PokemonFull[] = [];
  PickThisOne: boolean = false;
  Taken: number = 0;
  ToBeTaken: number = 2;
  choice1: number | null = null;
  currentUserID: number = 0;
  currentUser: string = '';

  newmon: Pokemon = {
    id: 0,
    pokemonid: 0,
    userid: this.currentUserID,
    level: 1,
    experience: 0,
    current_hitpoints: 0,
    teampos: 0,
    given_name: ''
  }
  
  @Input() pokemon: PokemonFull | undefined = undefined;
  @Output() addmember: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor(private pokemonapi: PokemonAPIService, private userapi: UserAPIService) { 
    this.refreshList();
    this.currentUserID = this.userapi.currentUserID;
  }

  ngOnInit(): void {
    this.currentUserID = this.userapi.currentUserID;
        this.currentUser = this.userapi.currentUser;
        this.Taken = this.userapi.teamcount;
  }
  refreshList() {
    this.pokemonapi.GetPokemon(
      (result: PokemonFull[]) => {
        console.log('Results!')
        console.log(result);
        this.pokemons = result;
      }
    )
  }
  showNaming() {
    this.PickThisOne = true;
  }
  hideNaming() {
    this.PickThisOne = false;
  }

  addMember(id : number) {
    this.newmon.pokemonid = this.pokemons[id - 1].id;
    this.newmon.userid = this.currentUserID;
    this.newmon.current_hitpoints = this.pokemons[id -1].hitpoints;

    this.pokemonapi.addPokemon(this.newmon, 
      () => {
        this.refreshList();
    });
      this.hideNaming();
      this.Taken += 1;
      if (this.choice1 == null)
      {
        this.choice1 = this.pokemons[id -1].id;
      }
      
  }
  

}