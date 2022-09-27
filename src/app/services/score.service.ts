import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private static SERVER_ADDR: string = '/api/v1/';

  constructor(private httpClient: HttpClient) { }

  getAllLeaderboardPlayers(): Observable<Player[]> {
    return this
        .httpClient
        .get<Player[]>(ScoreService.SERVER_ADDR + 'score')
  }

  updateScoreForPlayer(p: Player): Observable<Player> {
    console.log(p);
    return this
      .httpClient
      .post<Player>(ScoreService.SERVER_ADDR + 'score', p);
  }
}
