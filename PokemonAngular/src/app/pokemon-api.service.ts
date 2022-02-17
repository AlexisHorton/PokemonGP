import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemonmembers';
import { PokemonFull } from './pokemon-full';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PokemonAPIService {

  constructor(private http: HttpClient) { }

  listMembers(cb: any ){
    this.http.get<Pokemon[]>(`${environment.apiUrl}/pokemon`).subscribe(cb)
  }

  addPokemon(newMember: Pokemon, cb: any){
    this.http.post<Pokemon[]>(`${environment.apiUrl}/pokemon`, newMember).subscribe(cb)
  }

  deletePokemon(id: number, cb: any){
    this.http.delete(`${environment.apiUrl}/pokemon?id=${id}`).subscribe(cb)
  }

  GetPokemon(cb: any){
    this.http.get<PokemonFull[]>(`${environment.apiUrl}/pokemon/full_list`).subscribe(cb)
  }

  GetPokemonFull(id: number, cb: any){
    this.http.get<PokemonFull>(`${environment.apiUrl}/pokemon/single?id=${id}`).subscribe(cb)
  }

  updatePokemon(pokemon: Pokemon, cb: any){
		this.http.put<Pokemon>(`${environment.apiUrl}/pokemon`, pokemon).subscribe(cb);
	}

  GetEnemyPokemon(battlescore: number, cb: any) {
    this.http.get<PokemonFull>(`${environment.apiUrl}/pokemon/enemy?battlescore=${battlescore}`).subscribe(cb);
  }
}