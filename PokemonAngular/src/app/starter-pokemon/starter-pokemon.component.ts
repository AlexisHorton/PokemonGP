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
    level: 1,
    experience: 0,
    userid: this.userapi.currentUserID,
    teampos: 0,
    given_name: '',
    species: '',
    main_sprite: '',
    order: 0,
    base_experience: 0,
    maxhp: 0,
    current_hp: 0,
    attack: 0,
    defense: 0,
    type: ''
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
    this.newmon.species = this.pokemons[id - 1].species;
    this.newmon.main_sprite = this.pokemons[id - 1].main_sprite;
    this.newmon.order = this.pokemons[id - 1].order;
    this.newmon.base_experience = this.pokemons[id - 1].base_experience;
    this.newmon.maxhp = this.pokemons[id - 1].maxhp;
    this.newmon.current_hp = this.pokemons[id - 1].maxhp;
    this.newmon.attack = this.pokemons[id - 1].attack;
    this.newmon.defense = this.pokemons[id - 1].defense;
    this.newmon.type = this.pokemons[id - 1].type;

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
