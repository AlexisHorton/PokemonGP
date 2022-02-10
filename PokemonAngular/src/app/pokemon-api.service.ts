import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemonmembers';
import { PokemonFull } from './pokemon-full';

@Injectable({
  providedIn: 'root'
})
export class PokemonAPIService {

  constructor(private http: HttpClient) { }

  listMembers(currentUser: string, cb: any ){
    this.http.get<Pokemon[]>('https://localhost:5001/pokemon').subscribe(cb)
  }

  addPokemon(newMember: Pokemon, cb: any){
    this.http.post<Pokemon[]>('https://localhost:5001/pokemon', newMember).subscribe(cb)
  }

  deletePokemon(id: number, cb: any){
    this.http.delete(`https://localhost:5001/pokemon?id=${id}`).subscribe(cb)
  }

  GetPokemon(cb: any){
    this.http.get<PokemonFull[]>('https://localhost:5001/pokemon/full_list').subscribe(cb)
  }
  updatePokemon(editMember: Pokemon, cb: any){
    this.http.put('https://localhost:5001/pokemon', editMember).subscribe(cb)
  }
}
