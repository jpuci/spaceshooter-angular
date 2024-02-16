import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {GameComponent} from "./components/game/game.component";
import {MapSelectorComponent} from "./components/map-selector/map-selector.component";
import {LeaderboardComponent} from "./components/leaderboard/leaderboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ShopComponent} from "./components/shop/shop.component";
import {Rocket1Component} from "./components/rocket1/rocket1.component";
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
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'rocket1',
    component: Rocket1Component
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
