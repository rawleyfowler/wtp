import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Play } from './play.page';

const routes: Routes = [
  {
    path: '',
    component: Play,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule {}
