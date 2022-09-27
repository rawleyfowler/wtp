import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.page.html',
  styleUrls: ['leaderboard.page.scss']
})
export class Leaderboard implements OnInit {

  loading: boolean = true;
  players: Player[] = [];

  constructor(private scoreService: ScoreService) {}

  async ngOnInit() {
    await new Promise(r => setTimeout(r, 1000));
    this.scoreService.getAllLeaderboardPlayers().subscribe(p => {
      this.players = p as Player[];
      this.loading = false;
    })
  }
}
