import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PokemonAPIService } from '../pokemon-api.service';
import { PokemonFull } from '../pokemon-full'
import { Pokemon } from '../pokemonmembers'
import { BattlePokemon } from '../battle-pokemon'
import { UserAPIService } from '../user-api.service';

@Component({
	selector: 'app-pokemon-battle',
	templateUrl: './pokemon-battle.component.html',
	styleUrls: ['./pokemon-battle.component.css']
})
export class PokemonBattleComponent implements OnInit {

	PlayerTeam: Pokemon[] = []
	PlayerPokemon: BattlePokemon | null = null;
	EnemyPokemon: BattlePokemon | null = null;
  currentUserID: number = 0;
  currentUser: string = '';
  indexi: number = 0;

	inBattle: boolean = false;

	constructor(private pokemonapi: PokemonAPIService, private userapi: UserAPIService) { 
    this.currentUserID = this.userapi.currentUserID;
    this.currentUser = this.userapi.currentUser;
  }

	ngOnInit(): void {
		this.RefreshTeam()
	}

	RefreshTeam() {
		if (this.userapi.currentUserID > 0) {
			this.pokemonapi.listMembers(
				(result: Pokemon[]) => {
          for (this.indexi = 0; this.indexi < result.length; this.indexi++)
          {
            if (result[this.indexi].userid = this.currentUserID){
                this.PlayerTeam.push(result[this.indexi])
            }
          }
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
			let battlePokemon: BattlePokemon = {
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

	GetStarter() {
		for (let i: number = 0; i < this.PlayerTeam.length; i++) {
			let pokemon: Pokemon = this.PlayerTeam[i];
			if (pokemon.teampos == 1) {
				return pokemon;
			}
		}
		return null;
	}

	Battle() {
		this.inBattle = true;
		let playerPokemon: Pokemon | null = this.GetStarter();
    this.HealTeam();                                                          /*addition for notes   */
		if (playerPokemon) {
			this.GetPokemonFull(playerPokemon.pokemonid, (playerResult: PokemonFull) => {
				let pokemonFull: PokemonFull = playerResult
				console.log(playerResult)
				if (pokemonFull) {
					this.PlayerPokemon = this.CreateBattlePokemonProfile(pokemonFull, playerPokemon?.level, true);
				}
				this.GetPokemonFull(10 + (this.GetRandomInt(3) * 3), (result: PokemonFull) => {
					pokemonFull = result
					if (pokemonFull) {
						this.EnemyPokemon = this.CreateBattlePokemonProfile(pokemonFull, 3, false)
					}
				})
			});
		}
	}

	Attack(attacker: BattlePokemon | null, target: BattlePokemon | null) {
		if (attacker && target) {
			let damage = Math.floor((((2 * attacker.level) / 5) + 2) * attacker.attack / target.defense) + 2
			if (target.current_hitpoints - damage <= 0) {
				target.current_hitpoints = 0
				setTimeout(() => {
					this.EndBattle(target == this.EnemyPokemon);
				}, 1000)
			}
			else {
				target.current_hitpoints -= damage;
			}
		}
	}

	PlayTurn(pokemon1: BattlePokemon | null, pokemon2: BattlePokemon | null) {
		if (pokemon1 && pokemon2) {
			if (pokemon1.current_hitpoints > 0 && pokemon2.current_hitpoints > 0) {
				console.log("ran")
				this.Attack(pokemon1, pokemon2)
				if (pokemon2 && pokemon2.current_hitpoints > 0) {
					this.Attack(pokemon2, pokemon1)
				}
			}
		}
	}

	EndBattle(won: boolean) {
		this.inBattle = false
		let currentPokemon: Pokemon | null = this.GetStarter()
		if (currentPokemon && this.PlayerPokemon && this.EnemyPokemon) {
			let savePokemon: Pokemon = currentPokemon
			let playerPokemonFull: PokemonFull;
			let enemyPokemonFull: PokemonFull;
			this.GetPokemonFull(this.EnemyPokemon.id, (enemyResult: PokemonFull) => {
				if (this.PlayerPokemon) {
					this.GetPokemonFull(this.PlayerPokemon.id, (playerResult: PokemonFull) => {
						if (this.PlayerPokemon && this.EnemyPokemon) {
							playerPokemonFull = playerResult
							enemyPokemonFull = enemyResult
							if (won) {
								savePokemon.current_hitpoints = this.PlayerPokemon.current_hitpoints
								savePokemon.experience += enemyPokemonFull.base_experience * Math.floor(1 + (this.EnemyPokemon.level / 5))
								do {
									if (savePokemon.experience >= 100) {
										savePokemon.level++
										savePokemon.experience -= 100
										savePokemon.current_hitpoints += Math.floor(playerPokemonFull.hitpoints * (1 + (savePokemon.level/50))) - Math.floor(playerPokemonFull.hitpoints * (1 + ((savePokemon.level - 1)/50)))
									}
								} while (savePokemon.experience > 100)
							}
							else {
								savePokemon.current_hitpoints = 0
							}
							this.pokemonapi.updatePokemon(savePokemon, () => {})
							this.EnemyPokemon = null;
						}
					});
				}
			});
		}
	}

	HealTeam() {
		for (let i = 0; i < this.PlayerTeam.length; i++) {
			this.GetPokemonFull(this.PlayerTeam[i].pokemonid, (result: PokemonFull) => {
				this.PlayerTeam[i].current_hitpoints = Math.floor(result.hitpoints * (1 + (this.PlayerTeam[i].level / 50)))
				this.pokemonapi.updatePokemon(this.PlayerTeam[i], () => {});
			});
		}
	}
}