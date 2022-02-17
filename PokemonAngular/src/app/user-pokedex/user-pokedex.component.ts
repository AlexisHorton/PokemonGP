import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../pokemonmembers';
import { PokemonAPIService } from '../pokemon-api.service';
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
  pokeall: Pokemon[] = [];
  pokefull: PokemonFull[] = [];
  selected: number | null = null;
  currentUserID : number = 0;
  currentUser: string = '';
  teamcount: number = 0;
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
  reorganizemon: Pokemon = {
    id: 0,
    pokemonid: 0,
    level: 0,
    experience: 0,
    userid: 0,
    teampos: 0,
    given_name: '',
    current_hitpoints: 0
  }

  constructor(private pokemonapi: PokemonAPIService, private userapi: UserAPIService) { 
    this.currentUserID = this.userapi.currentUserID;
    this.currentUser = this.userapi.currentUser;
    this.refreshList();
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.pokemonapi.listMembers(this.currentUserID,
        (result: Pokemon[]) => {
          console.log('Results!')
          console.log(result);
          this.poketeam = result;
        }
      )
      this.pokemonapi.listMembers(this.currentUserID,
        (result: Pokemon[]) => {this.currentUserID
          console.log('Results!')
          console.log(result);
          this.pokeall = result;
          if (this.currentUserID > 0) {
            this.userapi.teamcount = this.poketeam.length;
          }
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
    if (this.tposition > 6){
      this.tposition = 0;
    }
    for (let i: number = 0; i < this.poketeam.length; i++)
    {
      if (this.poketeam[i].id == id){
    this.editmon.id = this.poketeam[i].id;
    this.editmon.level = this.poketeam[i].level;
    this.editmon.pokemonid = this.poketeam[i].pokemonid;
    this.editmon.experience = this.poketeam[i].experience;
    this.editmon.userid = this.poketeam[i].userid;
    this.editmon.teampos = this.tposition;
    this.editmon.given_name = this.poketeam[i].given_name;

        console.log(this.editmon)
      }
    }
    
    if (this.tposition > 0)
    {
    for (let i: number = 0; i < this.poketeam.length; i++)
    {
      if (this.poketeam[i].teampos == this.tposition) {
        this.reorganizemon.id = this.poketeam[i].id;
        this.reorganizemon.level = this.poketeam[i].level;
        this.reorganizemon.pokemonid = this.poketeam[i].pokemonid;
        this.reorganizemon.experience = this.poketeam[i].experience;
        this.reorganizemon.userid = this.poketeam[i].userid;
        this.reorganizemon.teampos = 0;
        this.reorganizemon.given_name = this.poketeam[i].given_name;

        console.log(this.reorganizemon)
        this.pokemonapi.updatePokemon(this.reorganizemon,
          () => {
          });
      }
    }
    this.pokemonapi.updatePokemon(this.editmon,
      () => {
        this.refreshList();
      });
  }}
}