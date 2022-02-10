import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../pokemonmembers';
import { PokemonAPIService } from '../pokemon-api.service';
import { UserAPIService } from '../user-api.service';


@Component({
  selector: 'app-user-pokedex',
  templateUrl: './user-pokedex.component.html',
  styleUrls: ['./user-pokedex.component.css']
})
export class UserPokedexComponent implements OnInit {

  moreinfo: boolean = false;
  poketeam: Pokemon[] = [];
  selected: number | null = null;
  @Input() currentuserID = this.userapi.currentUserID;
  @Input() tposition: number = 0;


  editmon: Pokemon = {
    id: 0,
    level: 1,
    experience: 0,
    userid: 0,
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

  constructor(private pokemonapi: PokemonAPIService, private userapi: UserAPIService) { 
    this.refreshList();
  }

  ngOnInit(): void {
  }
  refreshList() {
    this.pokemonapi.listMembers( this.userapi.currentUser, 
        (result: Pokemon[]) => {
          console.log('Results!')
          console.log(result);
          this.poketeam = result;
        }
      )
  }
  lookAtThis(id : number){
    this.selected = id;
    this.moreinfo = true;
    this.refreshList();
  }

  deletePokemon(id: number) {
  this.pokemonapi.deletePokemon(id, 
    () => {
      this.refreshList();
    });
  }
  editPokemon(id: number) {
    this.editmon.id = this.poketeam[id - 1].id
    this.editmon.level = this.poketeam[id - 1].level;
    this.editmon.experience = this.poketeam[id - 1].experience;
    this.editmon.userid = this.poketeam[id - 1].userid;
    this.editmon.teampos = this.tposition;
    this.editmon.given_name = this.poketeam[id - 1].given_name;
    this.editmon.species = this.poketeam[id - 1].species;
    this.editmon.main_sprite = this.poketeam[id - 1].main_sprite;
    this.editmon.order = this.poketeam[id - 1].order;
    this.editmon.maxhp = this.poketeam[id - 1].maxhp;
    this.editmon.current_hp = this.poketeam[id - 1].maxhp;
    this.editmon.attack = this.poketeam[id - 1].attack;
    this.editmon.defense = this.poketeam[id - 1].defense;
    this.editmon.type = this.poketeam[id - 1].type;

    this.pokemonapi.updatePokemon(this.editmon,
      () => {
        this.refreshList();
      });
  }
}
