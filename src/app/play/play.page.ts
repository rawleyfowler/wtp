import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss']
})
export class Play implements OnInit {

  loading: boolean = true;
  hidden: boolean = true;
  score: number = 0;

  private randomPokemon: Pokemon;
  private names: string[] = [];

  constructor(private pokemonService: PokemonService,
              private scoreService: ScoreService,
              private toastController: ToastController) {}

  ngOnInit(): void {
    this.reload();
  }

  getName(): string {
    return this.randomPokemon.name;
  }

  getImage(): string {
    return this.randomPokemon.image;
  }

  getNames(): string[] {
    return this.names;
  }

  handleResponse(name: string) {
    let t: Promise<any>;
    if (this.getName() === name) {
      t = this.handleSuccess();
    } else {
      t = this.handleFailure();
    }
    t.then(() => this.reload());
  }

  private async handleSuccess() {
    this.score++;
  }

  private async handleFailure() {
    let ip = '192.168.0.1';
    this.scoreService.updateScoreForPlayer({ ip, score: this.score }).subscribe(() => this.displayScoreSavedToast());
    this.score = 0;
  }

  private async displayScoreSavedToast() {
    const toast = await this.toastController.create({
      message: 'Saved your previous score',
      duration: 1000,
      position: 'top'
    });

    await toast.present();
  }

  private async reload() {
    this.hidden = true;
    this.pokemonService.getRandomPokemon().subscribe((p) => {
      this.randomPokemon = p;
      this.loading = false;
      this.names = this.shuffle([...this.pokemonService.getThreeRandomNames([p.name]), p.name]);
    });
  }

  private shuffle(array: any[]): string[] {
    let currentIndex: number = array.length;
    let randomIndex: number = Number.POSITIVE_INFINITY;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
}
