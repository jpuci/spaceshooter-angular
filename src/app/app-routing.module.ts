import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {GameComponent} from "./components/game/game.component";
import {MapSelectorComponent} from "./components/map-selector/map-selector.component";
import {LeaderboardComponent} from "./components/leaderboard/leaderboard.component";

const routes: Routes = [
  {
  path: 'menu',
  component: MainPageComponent
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: '/game'
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'maps',
    component: MapSelectorComponent
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
