import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Play } from './play.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PlayRoutingModule } from './play-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PlayRoutingModule
  ],
  declarations: [Play]
})
export class PlayModule {}
