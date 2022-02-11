import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonAPIService } from '../pokemon-api.service';
import { PokemonFull } from '../pokemon-full'
import { Pokemon } from '../pokemonmembers'
import { Battlepokemon } from '../battlepokemon'
import { UserAPIService } from '../user-api.service';

@Component({
  selector: 'app-pokemon-battle',
  templateUrl: './pokemon-battle.component.html',
  styleUrls: ['./pokemon-battle.component.css']
})
export class PokemonBattleComponent implements OnInit {

  PlayerTeam: Pokemon[] = []
	PlayerPokemon: Battlepokemon | null = null;
	EnemyPokemon: Battlepokemon | null = null;

  inBattle: boolean = false;


  constructor(private pokemonapi: PokemonAPIService, private userapi: UserAPIService) { }

  ngOnInit(): void {
    this.RefreshTeam();
  }

  GetUserID() {
		if (this.userapi.currentUser) {
			console.log("this ran")
			return this.userapi.currentUserID
		}
		else {
			return 0
		}
	}

  RefreshTeam() {
		if (this.GetUserID() > 0) {
			this.userapi.listTeam(this.GetUserID(),
				(result: Pokemon[]) => {
					this.PlayerTeam = result;
					let pokemon: Pokemon | null = this.GetStarter()
					if (pokemon) {
						let pokemonFull: PokemonFull;
						this.GetPokemonFull(pokemon.pokemonid, (result: PokemonFull) => {
							if (pokemon) {
								this.PlayerPokemon = this.CreateBattlePokemonProfile(result, pokemon.level, true)
							}
						});
					}
				}
			)
		}
	}
  GetRandomInt(max: number) {
		let num: number = Math.floor((Math.random() * max) + 0.5)
		return num
	}

	GetPlayerPokemonHitpoints(id: number) {
		for (let i = 0; i < this.PlayerTeam.length; i++) {
			if (this.PlayerTeam[i].pokemonid = id) {
				return this.PlayerTeam[i].current_hitpoints;
			}
		}
		return 0;
	}

  CreateBattlePokemonProfile(pokemon: PokemonFull, level: number | undefined, player: boolean) {
		if (level) {
			let battlePokemon: Battlepokemon = {
				id: pokemon.id,
				species: pokemon.species,
				level: level,
				hitpoints: Math.floor(pokemon.hitpoints * (1 + (level/50))),
				current_hitpoints: Math.floor(pokemon.hitpoints * (1 + (level/50))),
				attack: Math.floor(pokemon.attack * (1 + (level/50))),
				defense: Math.floor(pokemon.defense * (1 + (level/50)))
			}
			if (player) {
				battlePokemon.current_hitpoints = this.GetPlayerPokemonHitpoints(pokemon.id)
			}
			return battlePokemon
		}
		return null;
	}

  GetPokemonFull(id: number, cb: any) {
		this.pokemonapi.GetPokemonFull(id,
			(result: PokemonFull) => {
				cb(result);
			}
		)
	}

}
