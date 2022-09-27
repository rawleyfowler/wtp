import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, RawPokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private allRawPokemon: RawPokemon[] = []; 

  constructor(private httpClient : HttpClient) { }

  loadAllPokemon(): Observable<Object> {
    const observable = this
      .httpClient
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    observable.subscribe((p : any) => this.allRawPokemon = p.results);
    return observable;
  }

  getRandomPokemon(): Observable<Pokemon> {
    const rawPokemon = this.allRawPokemon[Math.floor(Math.random() * this.allRawPokemon.length)];
    return this
      .httpClient
      .get(`https://pokeapi.co/api/v2/pokemon/${rawPokemon.name}`)
      .pipe(map((t: any) => ({
        name: rawPokemon.name,
        image: t.sprites.front_default as string
      })));
  }

  getThreeRandomNames(exclude = []): string[] {
    const names = [];

    const getNamesRec = (): string[] => {
      if (names.length === 3) {
        return names;
      }

      const p = this.allRawPokemon[Math.floor(Math.random() * this.allRawPokemon.length)];
      if (names.includes(p.name) || exclude.includes(p.name)) {
        return getNamesRec();
      }

      names.push(p.name);
      return getNamesRec();
    }

    return getNamesRec();
  }
}
