import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Leaderboard } from './leaderboard.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LeaderboardRoutingModule } from './leaderboard-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LeaderboardRoutingModule
  ],
  declarations: [Leaderboard]
})
export class LeaderboardModule {}
