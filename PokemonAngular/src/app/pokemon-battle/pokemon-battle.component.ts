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
    PlayerPokemonFull: PokemonFull | null = null;
    EnemyPokemon: BattlePokemon | null = null;
    EnemyPokemonFull: PokemonFull | null = null;
 
    inBattle: boolean = false;
 
    constructor(private pokemonapi: PokemonAPIService, private userapi: UserAPIService) { }
 
    ngOnInit(): void {
        this.RefreshTeam()
    }
	
    EndBattle(won: boolean) {
        this.inBattle = false
        let currentPokemon: Pokemon | undefined = this.GetStarter()
        if (currentPokemon && this.PlayerPokemon && this.EnemyPokemon) {
            let savePokemon: Pokemon = currentPokemon
			if (this.PlayerPokemonFull && this.EnemyPokemonFull) {
				if (won) {
					savePokemon.current_hitpoints = this.PlayerPokemon.current_hitpoints
					savePokemon.experience += this.EnemyPokemonFull.base_experience * Math.floor(1 + (this.EnemyPokemon.level / 5))
					do {
						if (savePokemon.experience >= 100) {
							savePokemon.level++
							savePokemon.experience -= 100
							savePokemon.current_hitpoints += Math.floor(this.PlayerPokemonFull.hitpoints * (1 + (savePokemon.level/50))) - Math.floor(this.PlayerPokemonFull.hitpoints * (1 + ((savePokemon.level - 1)/50)))
						}
					} while (savePokemon.experience > 100)
				}
				this.pokemonapi.updatePokemon(savePokemon, () => {})
				this.RefreshTeam()
				this.EnemyPokemon = null;
			}
        }
    }

    GetUserID() {
        if (this.userapi.currentUser) {
            return this.userapi.currentUser.id
        }
        else {
            return 0
        }
    }
 
    GetRandomInt(max: number) {
        let num: number = Math.floor((Math.random() * max) + 0.5)
        return num
    }
 
    GetPlayerPokemonHitpoints(id: number) {
        for (let i = 0; i < this.PlayerTeam.length; i++) {
            if (this.PlayerTeam[i].id = id) {
                return this.PlayerTeam[i].current_hitpoints;
            }
        }
        return 0;
    }
 
    CreateBattlePokemonProfile(pokemon: PokemonFull, level: number, player: boolean) {
        let battlePokemon: BattlePokemon = {
            id: pokemon.id,
            species: pokemon.species,
            level: level,
            hitpoints: Math.floor(pokemon.hitpoints * (1 + (level/50))),
            current_hitpoints: Math.floor(pokemon.hitpoints * (1 + (level/50))),
            attack: Math.floor(pokemon.attack * (1 + (level/50))),
            defense: Math.floor(pokemon.defense * (1 + (level/50)))
        };
        if (player) {
            battlePokemon.current_hitpoints = this.GetPlayerPokemonHitpoints(pokemon.id);
        }
        return battlePokemon;
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
        let playerPokemon: Pokemon | undefined;
        if (playerPokemon != undefined) {
            this.GetPokemonFull(playerPokemon.id, (result: PokemonFull) => {
                this.PlayerPokemonFull = result
            });
            if (this.PlayerPokemonFull) {
                this.PlayerPokemon = this.CreateBattlePokemonProfile(this.PlayerPokemonFull, playerPokemon.level, true);
            }
            this.GetPokemonFull(10 + (this.GetRandomInt(3) * 3), (result: PokemonFull) => {
                this.EnemyPokemonFull = result;
            })
            if (this.EnemyPokemonFull) {
                this.EnemyPokemon = this.CreateBattlePokemonProfile(this.EnemyPokemonFull, this.GetEnemyLevel(), false)
            }
        }
    }
 
    PlayTurn(pokemon1: BattlePokemon | null, pokemon2: BattlePokemon | null) {
        if (pokemon1 && pokemon2 && pokemon1.current_hitpoints > 0 && pokemon2.current_hitpoints > 0) {
            this.Attack(pokemon1, pokemon2)
            if (pokemon2.current_hitpoints > 0) {
                this.Attack(pokemon2, pokemon1)
            }
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
 
    GetEnemyLevel() {
        let levelSum: number = 0;
        for (let i = 0; i < this.PlayerTeam.length; i++) {
            levelSum += this.PlayerTeam[i].level
        }
        let average = Math.floor(levelSum / this.PlayerTeam.length)
        if (average < 10) {
            return average - 2;
        }
        else {
            return average - 2 + this.GetRandomInt(4);
        }
    }
 
    RefreshTeam() {
        if (this.GetUserID() > 0) {
            this.userapi.listTeam(this.GetUserID(),
                (result: Pokemon[]) => {
                    console.log(result)
                    this.PlayerTeam = result;
                }
            )
        }
    }
}