import { Component, Input, OnInit } from '@angular/core';
import { PokemonAPIService } from '../pokemon-api.service';
import { Pokemon } from '../pokemonmembers';
import { UserAPIService } from '../user-api.service';
import { PokemonFull } from '../pokemon-full';

@Component({
  selector: 'app-user-pokedex',
  templateUrl: './user-pokedex.component.html',
  styleUrls: ['./user-pokedex.component.css']
})
export class UserPokedexComponent implements OnInit {

  moreinfo: boolean = false;
  poketeam: Pokemon[] = [];
  pokefull: PokemonFull[] = [];
  selected: number | null = null;
  @Input() currentuserID = this.userapi.currentUserID;
  @Input() tposition: number = 0;

  editmon: Pokemon = {
    id: 0,
    pokemonid: 0,
    level: 1,
    experience: 0,
    userid: 0,
    teampos: 0,
    given_name: '',
    current_hitpoints: 0
  }

  constructor(private pokemonapi: PokemonAPIService,private userapi: UserAPIService) { }

  ngOnInit(): void {
  }

  refreshList() {
    this.pokemonapi.listMembers( this.userapi.currentUserID, 
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
    
    this.pokemonapi.updatePokemon(this.editmon,
      () => {
        this.refreshList();
      });
    }

}
