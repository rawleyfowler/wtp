import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  loading: boolean = true;

  constructor(private pokemonService: PokemonService) {}

 async ngOnInit() {
    await new Promise(r => setTimeout(r, 1000));
    this.pokemonService.loadAllPokemon().subscribe(() => this.loading = false);
  }
}
