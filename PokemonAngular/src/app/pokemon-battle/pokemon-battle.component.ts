import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
	PlayerPokemon: PokemonFull | null = null;
	EnemyPokemon: PokemonFull | null = null;

	inBattle: boolean = false;

	constructor(private pokemonapi: PokemonAPIService, private userapi: UserAPIService) { }

	ngOnInit(): void {
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
		if (this.userapi.current_User) {
			return this.userapi.current_User.id
		}
		else {
			return 0
		}
	}

	Battle() {
		this.inBattle = true;
		alert(this.inBattle)
	}
}
