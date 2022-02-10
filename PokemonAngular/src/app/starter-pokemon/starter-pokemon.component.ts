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

  newmon: Pokemon = {
    id: 0,
    pokemonid: 0,
    userid: this.userapi.currentUserID,
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
  }

  ngOnInit(): void {
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
