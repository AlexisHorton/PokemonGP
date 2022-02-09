import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { PokemonAPIService } from '../pokemon-api.service';
import { PokemonFull } from '../pokemon-full'
import { Pokemon } from '../pokemonmembers'
import { UserAPIService } from '../user-api.service';

@Component({
	selector: 'app-pokemon-battle',
	templateUrl: './pokemon-battle.component.html',
	styleUrls: ['./pokemon-battle.component.css']
})
export class PokemonBattleComponent implements OnInit {

	PlayerTeam: Pokemon[] = []
	PlayerPokemon: PokemonFull = {
		id: 1,
		species: 'bulbasaur',
		main_sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
		height: 7,
		weight: 69,
		order: 1,
		base_experience: 64,
		maxhp: 45,
		current_hp: 45,
		attack: 49,
		defense: 49,
		type: 'grass',
	};
	EnemyPokemon: PokemonFull | null = null;

	PlayerPokemonLevel: number = 5;
	EnemyPokemonLevel: number = 0;

	inBattle: boolean = false;

	constructor(private pokemonapi: PokemonAPIService, private userapi: UserAPIService) { }

	ngOnInit(): void {
		this.ApplyLevelAdjust(this.PlayerPokemon, this.PlayerPokemonLevel);
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

	GetUserID() {
		if (this.userapi.currentUser) {
			return this.userapi.currentUser.id
		}
		else {
			return 0
		}
	}

	Battle() {
		this.inBattle = true;
		this.SetBattlePokemon();
	}

	GetRandomInt(max: number) {
		let num: number = Math.floor((Math.random() * max) + 0.5)
		return num
	}

	SetBattlePokemon() {
		if (this.EnemyPokemon == null) {
			this.pokemonapi.GetPokemonFull(10 + (this.GetRandomInt(3) * 3),
				(result: PokemonFull) => {
					this.EnemyPokemon = result;
					this.ApplyLevelAdjust(this.EnemyPokemon, this.EnemyPokemonLevel)
				}
			)
			this.EnemyPokemonLevel = this.PlayerPokemonLevel - 2;
		}
	}

	PlayTurn() {
		if (this.PlayerPokemon && this.EnemyPokemon) {
			this.Attack(this.PlayerPokemon, this.EnemyPokemon, this.PlayerPokemonLevel)
			if (this.inBattle) {
				this.Attack(this.EnemyPokemon, this.PlayerPokemon, this.EnemyPokemonLevel)
			}
		}
	}

	Attack(attacker: PokemonFull, target: PokemonFull, attackerLevel: number) {
		let damage: number = Math.floor(((((2 * attackerLevel) / 5) + 2) * attacker.attack / target.defense) + 2)
		if (target.current_hp - damage <= 0) {
			target.current_hp = 0;
			setTimeout(() => this.EndBattle(), 1000);
		}
		else {
			target.current_hp -= damage;
		}
	}

	EndBattle() {
		this.inBattle = false;
		this.EnemyPokemon = null;
		alert("Battle finished!")
	}

	ApplyLevelAdjust(pokemon: PokemonFull, level: number){
		pokemon.base_experience *= level
		pokemon.maxhp = Math.floor(pokemon.maxhp * (1 + level/50))
		pokemon.current_hp = Math.floor(pokemon.current_hp * (1 + level/50))
		pokemon.attack = Math.floor(pokemon.attack * (1 + level/50))
		pokemon.defense = Math.floor(pokemon.attack * (1 + level/50))
	}

	HealTeam() {
		this.PlayerPokemon.current_hp = this.PlayerPokemon.maxhp
	}
}
