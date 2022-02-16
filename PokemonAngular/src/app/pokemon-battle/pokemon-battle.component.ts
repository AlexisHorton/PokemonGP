import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonAPIService } from '../pokemon-api.service';
import { PokemonFull } from '../pokemon-full'
import { Pokemon } from '../pokemonmembers'
import { Battlepokemon } from '../battlepokemon'
import { UserAPIService } from '../user-api.service';
import { EnemyObject } from '../enemy-object';

@Component({
  selector: 'app-pokemon-battle',
  templateUrl: './pokemon-battle.component.html',
  styleUrls: ['./pokemon-battle.component.css']
})
export class PokemonBattleComponent implements OnInit {

  PlayerTeam: Pokemon[] = []
  PokemonFullList: PokemonFull[] = [];
  PlayerPokemon: Battlepokemon | null = null;
  PlayerPokemonFull: PokemonFull | null = null;
  EnemyPokemon: Battlepokemon | null = null;
  EnemyPokemonFull: PokemonFull | null = null;
  teamposition: number = 0;
  swappokemon: Pokemon | null = null;

  inBattle: boolean = false;
  turnPlaying: boolean = false;
  battleEnding: boolean = false;


  constructor(private pokemonapi: PokemonAPIService, private userapi: UserAPIService) { }

  ngOnInit(): void {
    this.RefreshTeam();
	this.pokemonapi.GetPokemon((result: PokemonFull[]) => {
		this.PokemonFullList = result;
	});
  }

  GetUserID() {
		if (this.userapi.currentUser) {
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

	CreateBattlePokemonProfile(id: number | null, pokemon: PokemonFull, level: number, player: boolean) {
        let battlePokemon: Battlepokemon = {
            id: pokemon.id,
            species: pokemon.species,
            level: level,
            hitpoints: Math.floor(pokemon.hitpoints * (1 + (level/50))),
            current_hitpoints: Math.floor(pokemon.hitpoints * (1 + (level/50))),
            attack: Math.floor(pokemon.attack * (1 + (level/50))),
            defense: Math.floor(pokemon.defense * (1 + (level/50)))
        };
        if (player && id) {
            battlePokemon.current_hitpoints = this.GetPlayerPokemonHitpoints(id);
        }
        return battlePokemon;
    }
	
    GetRandomEnemy(battlescore: number, cb: any) {
        this.pokemonapi.GetEnemyPokemon(battlescore,
            (result: EnemyObject) => {
                cb(result);
            }
        )
    }

  GetPokemonFull(id: number, cb: any) {
		this.pokemonapi.GetPokemonFull(id,
			(result: PokemonFull) => {
				cb(result);
			}
		)
	}

  GetStarter() {
	let pokemon: Pokemon | undefined;
		for (let i: number = 0; i < this.PlayerTeam.length; i++) {
			if (this.PlayerTeam[i].teampos == 1) {
                pokemon = this.PlayerTeam[i];
            }
        }
        return pokemon;
    }

	Battle() {
        this.inBattle = true;
        let playerPokemon: Pokemon | undefined = this.GetStarter();
        if (playerPokemon != undefined) {
            this.GetPokemonFull(playerPokemon.pokemonid, (playerResult: PokemonFull) => {
                this.PlayerPokemonFull = playerResult
				if (playerPokemon && playerResult) {
					this.PlayerPokemon = this.CreateBattlePokemonProfile(playerPokemon.id, playerResult, playerPokemon.level, true);
				}
				this.GetRandomEnemy(this.GetAverageTeamBattlescore(), (enemyResult: EnemyObject) => {
					this.EnemyPokemonFull = enemyResult.pokemon;
					if (enemyResult) {
						this.EnemyPokemon = this.CreateBattlePokemonProfile(null, enemyResult.pokemon, enemyResult.level, false)
					}
				})
            });
        }
    }

	Attack(attacker: Battlepokemon | null, target: Battlepokemon | null) {
        if (attacker && target) {
            let damage = Math.floor((((2 * attacker.level) / 5) + 2) * attacker.attack / target.defense) + 2
            if (Math.floor(Math.random() * 10) == 0) {
                damage *= 2;
            }
            if (target.current_hitpoints - damage <= 0) {
                target.current_hitpoints = 0
                this.battleEnding = true;
                setTimeout(() => {
                    this.EndBattle(target == this.EnemyPokemon);
                    this.battleEnding = false;
                    this.turnPlaying = false;
                }, 1000)
            }
            else {
                target.current_hitpoints -= damage;
                if (target == this.PlayerPokemon) {
                    setTimeout(() => {
                        this.turnPlaying = false;
                    }, 500)
                }
            }
        }
    }

	PlayTurn(pokemon1: Battlepokemon | null, pokemon2: Battlepokemon | null) {
        this.turnPlaying = true;
        if (pokemon1 && pokemon2 && pokemon1.current_hitpoints > 0 && pokemon2.current_hitpoints > 0) {
            this.Attack(pokemon1, pokemon2)
            if (pokemon2.current_hitpoints > 0) {
                setTimeout(() => {
                    this.Attack(pokemon2, pokemon1)
                }, 500)
            }
        }
    }

	EndBattle(won: boolean) {
        this.inBattle = false
        let currentPokemon: Pokemon | undefined = this.GetStarter()
        if (currentPokemon && this.PlayerPokemon && this.EnemyPokemon) {
            let savePokemon: Pokemon = currentPokemon
            if (this.PlayerPokemonFull && this.EnemyPokemonFull) {
                savePokemon.current_hitpoints = this.PlayerPokemon.current_hitpoints
                if (won) {
                    if (savePokemon.level < 100) {
                        savePokemon.experience += this.EnemyPokemonFull.base_experience * Math.floor(1 + (this.EnemyPokemon.level / 5))
                        while (savePokemon.experience > Math.pow(savePokemon.level, 3) && savePokemon.level < 100) {
                            savePokemon.experience -= Math.pow(savePokemon.level, 3)
                            savePokemon.level++
                            savePokemon.current_hitpoints += Math.floor(this.PlayerPokemonFull.hitpoints * (1 + (savePokemon.level/50))) - Math.floor(this.PlayerPokemonFull.hitpoints * (1 + ((savePokemon.level - 1)/50)))
                            if (this.PlayerPokemonFull.evolve_to != 0 && savePokemon.level >= this.PlayerPokemonFull.evolve_at) {
                                savePokemon.pokemonid = this.PlayerPokemonFull.evolve_to;
                            }
                        }
                    }
                    else {
                        savePokemon.experience = 0
                    }
                    if (this.GetRandomInt(10) < 1) {
                        let earnedPokemon: Pokemon = {
                            id: 0,
                            pokemonid: this.EnemyPokemonFull.id,
                            userid: this.GetUserID(),
                            level: this.EnemyPokemon.level,
                            experience: 0,
                            current_hitpoints: 0,
                            teampos: 0,
                            given_name: this.EnemyPokemon.species
                        }
                        this.pokemonapi.addPokemon(earnedPokemon, () => {})
                    }
                }
                this.pokemonapi.updatePokemon(savePokemon, () => {
                    this.RefreshTeam()
                })
                this.EnemyPokemon = null;
                this.EnemyPokemonFull = null;
                this.turnPlaying = false;
            }
        }
    }

	HealTeam() {
		for (let i = 0; i < this.PlayerTeam.length; i++) {
			let pokemon: Pokemon = this.PlayerTeam[i]
			this.GetPokemonFull(pokemon.pokemonid, (result: PokemonFull) => {
				pokemon.current_hitpoints = Math.floor(result.hitpoints * (1 + (pokemon.level/50)))
			})
		}
	}

	GetAverageTeamBattlescore() {
        let sum: number = 0;
        for (let i = 0; i < this.PlayerTeam.length; i++) {
            console.log(this.PlayerTeam[0].pokemonid)
            sum += Math.floor(this.PokemonFullList[this.PlayerTeam[i].pokemonid - 1].battle_score * Math.pow(1 + (this.PlayerTeam[i].level / 50), 3));
        }
        let average: number = Math.floor(sum / this.PlayerTeam.length);
        console.log(average);
        return average;
    }

    DisplayItems() {

    }

    DisplayTeam() {

    }
    SwapPosition(id: number) {
        for (let i: number = 0; i < this.PlayerTeam.length; i++) {
            if (this.PlayerTeam[i].id == id) {
                this.teamposition = this.PlayerTeam[i].teampos
                this.PlayerTeam[i].teampos = 1;
                this.pokemonapi.updatePokemon(this.PlayerTeam[i], () => {})
            }
            else if (this.PlayerTeam[i].teampos == 1) {
                this.swappokemon = this.PlayerTeam[i]
            }
        }
        if (this.swappokemon) {
            this.swappokemon.teampos = this.teamposition
            console.log(this.teamposition)
            this.pokemonapi.updatePokemon(this.swappokemon, () => {});
        }
        this.PlayerPokemon = null;
        this.PlayerPokemonFull = null;
        this.RefreshTeam();
        let playerPokemon: Pokemon | undefined = this.GetStarter();
        if (playerPokemon != undefined) {
            this.GetPokemonFull(playerPokemon.pokemonid, (playerResult: PokemonFull) => {
                this.PlayerPokemonFull = playerResult
				if (playerPokemon && playerResult) {
					this.PlayerPokemon = this.CreateBattlePokemonProfile(playerPokemon.id, playerResult, playerPokemon.level, true);
				}
            });
        }
    }
}
